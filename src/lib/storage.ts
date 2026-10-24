/**
 * Minimal promise-based key-value store on top of IndexedDB.
 *
 * IndexedDB is used instead of localStorage because a profile holds several images
 * as data URLs, which quickly exceeds localStorage's ~5 MB limit.
 */
const DATABASE_NAME = "instapreview";
const STORE_NAME = "keyval";

let database: Promise<IDBDatabase> | undefined;

function openDatabase(): Promise<IDBDatabase> {
  database ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      database = undefined;
      reject(request.error);
    };
  });
  return database;
}

async function run<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = operation(db.transaction(STORE_NAME, mode).objectStore(STORE_NAME));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const storage = {
  get: <T>(key: string) => run<T | undefined>("readonly", (store) => store.get(key)),
  set: async (key: string, value: unknown) => {
    await run("readwrite", (store) => store.put(value, key));
  },
  remove: async (key: string) => {
    await run("readwrite", (store) => store.delete(key));
  },
};
