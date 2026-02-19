const CACHE_NAME = 'ufarmx-app-v1';
const ASSET_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
];
const DB_NAME = 'UfarmXOfflineDB';
const DB_VERSION = 1;
const STORE_NAME = 'outbox';
const SYNC_TAG = 'sync-forms';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSET_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  const isSameOrigin = new URL(request.url).origin === self.location.origin;
  if (!isSameOrigin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => cached || caches.match('/index.html'));

      return cached || networkFetch;
    })
  );
});

function openOutboxDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('type', 'type', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getOutboxItems() {
  return openOutboxDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      })
  );
}

function deleteOutboxItem(id) {
  return openOutboxDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      })
  );
}

async function syncHttpOnlyItems() {
  const items = await getOutboxItems();
  const ordered = [...items].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

  for (const item of ordered) {
    if (item.type !== 'http' || !item.url) {
      continue;
    }

    try {
      const response = await fetch(item.url, {
        method: item.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item.payload || {}),
      });

      if (response.ok) {
        await deleteOutboxItem(item.id);
      }
    } catch (error) {
      break;
    }
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(syncHttpOnlyItems());
  }
});
