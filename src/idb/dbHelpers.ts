import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { IConversationItem } from '@/types/conversation-item.ts'
import { ConversationItemModel } from '@/idb/models/ConversationItemModel.ts'

const dbName = 'ChatDatabase';
const storeName = 'chatHistory';

let db: IDBPDatabase<unknown> | null = null;

export const initDB = async (): Promise<void> => {
  db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveMessage = async (message: IConversationItem): Promise<void> => {
  if (db) {
    const model = new ConversationItemModel(message);
    const encodedMessage = model.encode();
    await db.put(storeName, encodedMessage);
  }
};

export const loadChatHistory = async (): Promise<IConversationItem[]> => {
  if (db) {
    const allMessages = await db.getAll(storeName);
    return allMessages.map((message) =>
      ConversationItemModel.decode(message as IConversationItem)
    );
  }
  return [];
};

export const clearChatHistory = async (): Promise<void> => {
  if (db) {
    await db.clear(storeName);
  }
};
