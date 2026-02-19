const DB_NAME = 'UfarmXOfflineDB';
const DB_VERSION = 1;
const STORE_NAME = 'outbox';

function openOutboxDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('type', 'type', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function withStore(mode, callback) {
  return openOutboxDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);
        const result = callback(store);

        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
  );
}

export function addOutboxItem(item) {
  return withStore('readwrite', (store) => store.add(item));
}

export function getOutboxItems() {
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

export function getOutboxCount() {
  return openOutboxDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.count();

        request.onsuccess = () => resolve(request.result || 0);
        request.onerror = () => reject(request.error);
      })
  );
}

export function deleteOutboxItem(id) {
  return withStore('readwrite', (store) => store.delete(id));
}

export function updateOutboxItem(item) {
  return withStore('readwrite', (store) => store.put(item));
}

export const OUTBOX_DB_NAME = DB_NAME;
export const OUTBOX_STORE_NAME = STORE_NAME;
