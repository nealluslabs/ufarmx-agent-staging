import axios from 'axios';
import { S3 } from 'aws-sdk';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import baseUrl from 'src/redux/actions/baseUrl';
import { addOutboxItem, deleteOutboxItem, getOutboxItems, updateOutboxItem } from './outboxDb';

const SYNC_TAG = 'sync-forms';
const MAX_RETRIES = 5;
let isSyncing = false;
const RETAILER_DOC_FIELDS = [
  'idDocument',
  'utilityBill',
  'shopPhotos',
  'proofOfAddress',
  'cacCertificate',
  'statusReport',
  'memart',
];

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});

function createClientId(prefix = 'offline') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function withSyncMetadata(payload) {
  return {
    ...payload,
    client_id: payload?.client_id || createClientId('ufarmx'),
    captured_at: payload?.captured_at || new Date().toISOString(),
  };
}

export function fileToDataUrl(file) {
  let blob = file;

  if (file && file.selectedFile) {
    blob = file.selectedFile;
  } else if (Array.isArray(file)) {
    blob = file[0];
  }

  if (!(blob instanceof Blob)) {
    return Promise.reject(new TypeError('Invalid file input: expected a Blob/File'));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read photo for offline storage'));
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl) {
  const [meta, data] = dataUrl.split(',');
  const mimeMatch = /data:(.*?);base64/.exec(meta);
  const mimeType = (mimeMatch && mimeMatch[1]) || 'application/octet-stream';
  const binary = atob(data);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

function isDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:');
}

function extensionFromMimeType(mimeType) {
  if (!mimeType) return 'bin';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/webp') return 'webp';
  return mimeType.split('/')[1] || 'bin';
}

async function uploadToS3FromDataUrl(
  photoDataUrl,
  keyPrefix = 'offline-intake',
  bucket = process.env.REACT_APP_S3_BUCKET
) {
  const blob = dataUrlToBlob(photoDataUrl);
  const ext = extensionFromMimeType(blob.type);
  const key = `${keyPrefix}-${Date.now()}.${ext}`;

  const data = await s3
    .upload({
      Body: blob,
      Bucket: bucket,
      Key: key,
      ContentType: blob.type || 'application/octet-stream',
    })
    .promise();

  return data.Location;
}

async function syncRetailerPayload(payload) {
  const processedPayload = { ...payload };
  const retailerBucket = process.env.REACT_APP_S3_BUCKET_2 || process.env.REACT_APP_S3_BUCKET;

  for (const field of RETAILER_DOC_FIELDS) {
    const value = processedPayload[field];
    if (isDataUrl(value)) {
      processedPayload[field] = await uploadToS3FromDataUrl(
        value,
        `offline-retailer-${field}`,
        retailerBucket
      );
    }
  }

  const payloadWithMeta = withSyncMetadata(processedPayload);

  return axios.post(`${baseUrl}/api/retailers/`, { ...payloadWithMeta, photoUrl: '' });
}

async function syncIntakePayload(payload) {
  const { response, photoDataUrl } = payload;
  const photoUrl = await uploadToS3FromDataUrl(photoDataUrl);

  const farmerDetailsObject = {
    hasID: response?.responseObject?.hasID,
    age: response?.responseObject?.age,
    educationLevel: response?.responseObject?.educationLevel,
    farmingExperience: response?.responseObject?.farmingExperience,
    familySize:
      response?.responseObject?.noOfChildren || response?.responseObject?.noOfSpouse
        ? (Number(response?.responseObject?.noOfChildren) || 0) +
          (Number(response?.responseObject?.noOfSpouse) || 0)
        : 0,
    farmingCrop: response?.responseObject?.farmingCrop,
    landOwnership: response?.responseObject?.landOwnership,
    farmSize: response?.responseObject?.farmSize,
    farmSizeUnit: response?.responseObject?.farmSizeUnit,
    insurance: response?.responseObject?.insurance,
    irrigation: response?.responseObject?.irrigation,
    offFarmIncome: response?.responseObject?.offFarmIncome,
    salesChannel: response?.responseObject?.salesChannel,
    farmerGroups: response?.responseObject?.farmerGroups,
  };

  const creditScoreObject = await axios.post(
    'https://ufarmx-credit-server.vercel.app/calculate-score',
    farmerDetailsObject
  );

  const riskScore = creditScoreObject?.data?.riskScore;
  if (!riskScore) {
    throw new Error('Could not calculate farmer risk score during sync');
  }

  const payloadWithMeta = withSyncMetadata(response);

  return axios.post(`${baseUrl}/api/responses/`, {
    ...payloadWithMeta,
    responseObject: {
      ...response.responseObject,
      photo: photoUrl,
      riskScore,
    },
  });
}

function isNetworkError(error) {
  return !error?.response;
}

function buildQueueItem(input) {
  return {
    type: input.type,
    url: input.url || null,
    method: input.method || 'POST',
    payload: input.payload,
    createdAt: Date.now(),
    retries: 0,
    lastError: null,
  };
}

export async function enqueueHttpSubmission({ url, payload, method = 'POST' }) {
  const item = buildQueueItem({
    type: 'http',
    url,
    method,
    payload: withSyncMetadata(payload),
  });

  await addOutboxItem(item);
  await registerBackgroundSync();
}

export async function enqueueIntakeSubmission({ response, photoDataUrl }) {
  const item = buildQueueItem({
    type: 'intake',
    payload: {
      response: withSyncMetadata(response),
      photoDataUrl,
    },
  });

  await addOutboxItem(item);
  await registerBackgroundSync();
}

export async function enqueueRetailerSubmission({ payload }) {
  const item = buildQueueItem({
    type: 'retailer',
    payload: withSyncMetadata(payload),
  });

  await addOutboxItem(item);
  await registerBackgroundSync();
}

export async function registerBackgroundSync() {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  if (registration && registration.sync) {
    await registration.sync.register(SYNC_TAG);
  }
}

async function processQueueItem(item) {
  if (item.type === 'http') {
    await axios({
      url: item.url,
      method: item.method || 'POST',
      data: item.payload,
      headers: { 'Content-Type': 'application/json' },
    });
    return;
  }

  if (item.type === 'intake') {
    await syncIntakePayload(item.payload);
    return;
  }

  if (item.type === 'retailer') {
    await syncRetailerPayload(item.payload);
  }
}

export async function syncOutboxNow() {
  if (isSyncing || !navigator.onLine) {
    return;
  }

  isSyncing = true;

  try {
    const items = await getOutboxItems();
    const orderedItems = [...items].sort((a, b) => a.createdAt - b.createdAt);
    let syncedCount = 0;

    for (const item of orderedItems) {
      try {
        await processQueueItem(item);
        await deleteOutboxItem(item.id);
        syncedCount += 1;
      } catch (error) {
        const retries = (item.retries || 0) + 1;
        const nextItem = {
          ...item,
          retries,
          lastError: error?.message || 'Unknown sync error',
        };

        if (isNetworkError(error) || retries <= MAX_RETRIES) {
          await updateOutboxItem(nextItem);
        } else {
          await deleteOutboxItem(item.id);
        }

        if (isNetworkError(error)) {
          break;
        }
      }
    }

    if (syncedCount > 0) {
      notifySuccessFxn(`${syncedCount} offline submission(s) synced`);
    }
  } catch (error) {
    notifyErrorFxn('Offline sync failed. Will retry when online.');
  } finally {
    isSyncing = false;
  }
}

export function initOutboxSync() {
  if (typeof window === 'undefined') {
    return;
  }

  const trySync = () => {
    syncOutboxNow().catch(() => {
      // No-op; retried on next online/sync event
    });
  };

  window.addEventListener('online', trySync);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      trySync();
    }
  });

  setTimeout(trySync, 800);
}

export { SYNC_TAG };
