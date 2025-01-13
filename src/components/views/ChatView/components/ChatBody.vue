<script setup lang="ts">
import ChatAvatar from '@/components/simple/ChatAvatar.vue'

defineProps({
  messages: {
    type: Array as () => Array<{ sender: string; text: string }>,
    required: true,
  },
  isTyping: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="chat-body">
    <div class="chat-body-wrapper">
      <div
        :class="['chat-message-wrapper', message.sender]"
        v-for="(message, index) in messages"
        :key="index"
      >
        <ChatAvatar class="chat-body-avatar" v-if="message.sender === 'bot'"/>
        <div :class="['chat-message', message.sender]">
          <p>{{ message.text }}</p>
        </div>
      </div>
    </div>

    <div v-if="isTyping" class="chat-message-typing-animation">
      Typing <span/><span/><span/>
    </div>
  </div>
</template>

<style scoped>
.chat-body {
  height: 100%;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-body-wrapper {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  padding: 16px;
}

.chat-message-wrapper {
  margin-bottom: 0.5rem;
  display: flex;
  width: fit-content;
  text-align: left;
  gap: 6px;
  align-items: self-end;
}

.chat-message-wrapper.user {
  margin-left: auto;
  max-width: 78%;
}

.chat-message-wrapper.bot {
  max-width: 92%;
}

.chat-body-avatar {
  margin-bottom: -2px;
}
.chat-message {
  font-size: 14px;
  line-height: 16px;
  padding: 12px;
  word-break: break-word;
}
.chat-message.user {
  background: #e5e5e5;
  color: #333333;
  border-radius: 8px 8px 3px 8px;
}
.chat-message.bot {
  background: #4179ff;
  color: #ffffff;
  border-radius: 8px 8px 8px 3px;
}

.chat-message-typing-animation {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  position: absolute;
  bottom: 8px;
  line-height: 12px;
  font-size: 12px;
  color: grey;
  left: 10px;
}

.chat-message-typing-animation span {
  width: 4px;
  height: 4px;
  background-color: grey;
  border-radius: 50%;
  animation: typing 1.5s infinite;
}

.chat-message-typing-animation span:nth-child(2) {
  animation-delay: 0.2s;
}

.chat-message-typing-animation span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
