<script setup lang="ts">
import IconSendHorizontal from '@/components/icons/IconSendHorizontal.vue'
import { inject } from 'vue'

const toggleView = inject('toggleView');
</script>

<template>
  <div class="new-conversation">
    <button class="new-conversation-btn" @click="toggleView">
      <IconSendHorizontal/>
      New Conversation
    </button>
  </div>
</template>

<style>
.new-conversation {
  margin: 0 18px;
  padding: 16px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
  border-radius: 5px;
  background-color: #fff;
  color: #92929e;
}
@media (max-width: 420px) {
  .new-conversation {
    margin: 0 8px;
    padding: 16px;
  }
}
.new-conversation-btn {
  cursor: pointer;
  margin: 0;
  border-radius: 5px;
  text-transform: none;
  box-sizing: border-box;
  padding: .5rem 1rem;
  vertical-align: middle;
  font-size: 1rem;
  border: 1px solid var(--color-primary-background);
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
  background-color: var(--color-primary-background);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 12px;
}
</style>
