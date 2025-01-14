import { ref } from 'vue'
import { saveMessage } from '@/shared/dbHelpers.ts'

const chatHistory = ref<{ sender: string; text: string }[]>([])

export const addMessageToHistory = (message: { sender: string; text: string, timestamp?: Date }, saveToDB = true) => {
  const messageWithTimestamp = {
    ...message,
    timestamp: message.timestamp || Date.now(),
  };

  chatHistory.value.unshift(messageWithTimestamp)
  if (saveToDB) {
    saveMessage(messageWithTimestamp);
  }
}

export const getChatHistory = () => chatHistory.value
