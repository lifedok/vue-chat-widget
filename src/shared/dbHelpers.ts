import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb';
import type { IConversationItem } from '@/types/conversation-item.ts'
import { decodeMessage, encodeMessage } from '@/shared/helpers.tsx'

const dbName = 'ChatDatabase';
const storeName = 'chatHistory';

let db: IDBPDatabase<unknown> | null = null;

export const initDB = async (): Promise<void> => {
  db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

export const saveMessage = async (message: IConversationItem): Promise<void> => {
  if (db) {
    const encodedMessage = {
      ...message,
      text: encodeMessage(message.text),
    }
    await db.put(storeName, encodedMessage)
  }
}

export const loadChatHistory = async (): Promise<IConversationItem[]> => {
  if (db) {
    const allMessages = await db.getAll(storeName)
    return allMessages.map(({ sender, text }) => ({
      sender,
      text: decodeMessage(text)
    }))
  }
  return []
}

export const clearChatHistory = async (): Promise<void> => {
  if (db) {
    await db.clear(storeName)
  }
}
