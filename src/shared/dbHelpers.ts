import { openDB } from 'idb'
import type { IConversationItem } from '@/types/conversation-item.ts'
import { decodeBase64, encodeBase64 } from '@/shared/helpers.tsx'

const dbName = 'ChatDatabase'
const storeName = 'chatHistory'
let db: never | null = null

export const initDB = async () => {
  db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

export const saveMessage = async (message: IConversationItem) => {
  if (db) {
    const encodedMessage = {
      ...message,
      text: encodeBase64(message.text),
    }
    await db.put(storeName, encodedMessage)
  }
}

export const loadChatHistory = async () => {
  if (db) {
    const allMessages = await db.getAll(storeName)
    return allMessages.map(({ sender, text }) => ({
      sender,
      text: decodeBase64(text)
    }))
  }
  return []
}

export const clearChatHistory = async () => {
  if (db) {
    await db.clear(storeName)
  }
}
