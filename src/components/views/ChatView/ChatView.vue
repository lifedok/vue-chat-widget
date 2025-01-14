<script setup lang="ts">
import ChatHeader from '@/components/views/ChatView/components/ChatHeader.vue'
import ChatBody from '@/components/views/ChatView/components/ChatBody.vue'
import ChatFooter from '@/components/views/ChatView/components/ChatFooter.vue'
import { inject, ref } from 'vue'
import { transformText, reverseString, delay } from '@/shared/helpers.tsx'
import { addMessageToHistory, getChatHistory } from '@/services/chatHistory.ts'
import { greetings, maxMessages } from '@/shared/const.ts'
const chatEnded = inject('chatEnded', ref(false));
const emit = defineEmits(['resetChat']);

let hasGreeted = false;

const isTyping = ref(false);

const responseQueue: Array<() => void> = [];

const getRandomResponse = (text: string): string => {
  const scenarios = [reverseString(text), transformText(text)];
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};

const processResponseQueue = async () => {
  if (isTyping.value || responseQueue.length === 0) return;

  const nextResponse = responseQueue.shift();
  if (nextResponse) {
    isTyping.value = true;
    await delay(2000);
    isTyping.value = false;
    nextResponse();
  }

  if (responseQueue.length > 0) {
    processResponseQueue();
  }
};

const sendGoodbyeMsg = () => {
  responseQueue.push(() => {
    addMessageToHistory({
      sender: 'bot',
      text: "My limit is exhausted, I can't write anymore. Goodbye!",
    });

    emit('resetChat');
  });
}


const handleMessage = (text: string) => {
  console.log('handleMessage', text)
  addMessageToHistory({ sender: 'user', text });

  if (chatEnded.value) return;
  const lowerText = text.toLowerCase();
  if (!hasGreeted && greetings.some((greeting) => lowerText.includes(greeting))) {
    hasGreeted = true;

    responseQueue.push(() => {
      addMessageToHistory({
        sender: 'bot',
        text: 'Hello! Can I help you?',
      });
    });

    processResponseQueue();
  } else {
    if (!hasGreeted) hasGreeted = true;

    if (getChatHistory().length > maxMessages) {
      sendGoodbyeMsg();
    } else {
      const response = getRandomResponse(text);
      responseQueue.push(() => {
        addMessageToHistory({ sender: 'bot', text: response });
        console.log('addMessageToHistory', getChatHistory())
      });
      if (getChatHistory().length > maxMessages) {
        sendGoodbyeMsg();
      }
    }
    processResponseQueue();
  }
};

</script>

<template>
  <div class="chat-view">
    <ChatHeader />
    <ChatBody :messages="getChatHistory()" :isTyping="isTyping"/>
    <ChatFooter @sendMessage="handleMessage" :isDisabledBtn="chatEnded"/>
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
