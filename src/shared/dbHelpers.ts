import { openDB } from 'idb';

const dbName = 'ChatDatabase';
const storeName = 'chatHistory';
let db: never | null = null;

export const initDB = async () => {
  db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveMessage = async (message: { sender: string; text: string }) => {
  if (db) {
    await db.put(storeName, { ...message, timestamp: Date.now() });
  }
};

export const loadChatHistory = async () => {
  if (db) {
    const allMessages = await db.getAll(storeName);
    return allMessages.map(({ sender, text }) => ({ sender, text }));
  }
  return [];
};

export const clearChatHistory = async () => {
  if (db) {
    await db.clear(storeName);
  }
};
