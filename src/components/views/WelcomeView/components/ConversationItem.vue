<script setup lang="ts">
import ChatAvatar from '@/components/simple/ChatAvatar.vue'
import type { IConversationItem } from '@/types/conversation-item.ts'

const props = defineProps<{
  item: IConversationItem;
}>();

</script>

<template>
  <li role="button" tabindex="0" class="conversation-item">
    <ChatAvatar />
    <div class="conversation-item-content">
      <div class="conversation-item-left">
        <div class="conversation-item-title conversation-item-overflow">Unanswered</div>
        <div class="conversation-item-description conversation-item-overflow">
          <span>
            Sorry to keep you waiting, unfortunately all of our agents are currently busy or away,
            please leave a message and we will get back to you as soon as possible. What’s the best
            email to reach you on?
          </span>
        </div>
      </div>
      <div class="conversation-item-right">
        <time>Today, 14:02</time>
      </div>
    </div>
  </li>
</template>

<style scoped>
.conversation-item {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  max-height: 64px;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px;
}

.conversation-item:hover {
  background: #f7f7f9;
}

.conversation-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.conversation-item-left {
  overflow: hidden;
}

.conversation-item-overflow {
  max-width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-item-title {
  color: #242424;
  font-size: 13px;
  line-height: normal;
  font-weight: 600;
  margin-bottom: 8px;
}

.conversation-item-description {
  color: #242424;
  font-size: 13px;
  line-height: normal;
  font-weight: 400;
}

.conversation-item-right {
  font-size: 12px;
  color: #92929e;
  text-align: center;
}
</style>
