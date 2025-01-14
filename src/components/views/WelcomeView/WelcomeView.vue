<script setup lang="ts">
import WelcomeBlock from '@/components/views/WelcomeView/components/WelcomeBlock.vue'
import NewConversation from '@/components/views/WelcomeView/components/NewConversation.vue'
// import ConversationBlock from '@/components/views/WelcomeView/components/ConversationBlock.vue'

// import { computed } from 'vue';
// import { getChatHistory } from '@/services/chatHistory.ts'

// const chatHistory = computed(() => getChatHistory());
// const list = chatHistory.value;
// console.log('chatHistory', chatHistory.value)
// console.log('list', list)
</script>

<template>
  <WelcomeBlock/>
  <NewConversation/>
<!--  <ConversationBlock v-if="!!list.length" :list="list"/>-->
</template>

<style scoped>

</style>
