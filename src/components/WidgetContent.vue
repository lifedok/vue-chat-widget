<script setup lang="ts">
import { provide, ref } from 'vue'
import ChatView from '@/components/views/ChatView/ChatView.vue'
import WelcomeView from '@/components/views/WelcomeView/WelcomeView.vue'

const isConversationView = ref(true)
const toggleView = () => {
  isConversationView.value = !isConversationView.value
}
provide('toggleView', toggleView)
</script>

<template>
  <div class="widget-content">
    <div class="widget-welcome" v-if="isConversationView">
      <WelcomeView />
    </div>
    <div class="widget-chat-view" v-else>
      <ChatView />
    </div>
  </div>
</template>

<style scoped>
.widget-content {
  background-color: var(--color-background-optional);
  width: 348px;
  height: 524px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
@media (max-width: 420px) {
  .widget-content {
    width: 80vw;
  }
}

.widget-welcome {
  overflow-y: auto;
  padding-bottom: 18px;
  gap: 12px;
  display: flex;
  flex-direction: column;
}

.widget-chat-view {
  background: #ffffff;
  height: 100%;
}
</style>
