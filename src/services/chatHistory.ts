import { ref } from 'vue'
import { clearChatHistory, saveMessage } from '@/idb/dbHelpers.ts'
import type { IConversationItem } from '@/types/conversation-item.ts'

const chatHistory = ref<IConversationItem[]>([])

export const addMessageToHistory = (message: IConversationItem, saveToDB = true) => {
  chatHistory.value.unshift(message)
  if (saveToDB) {
    saveMessage(message);
  }
}

export const getChatHistory = () => chatHistory.value

export const clearMessageFromHistory = async () => {
  chatHistory.value = [];
  await clearChatHistory();
  console.log('Chat history cleared.');
};
