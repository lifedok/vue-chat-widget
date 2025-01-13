<script setup lang="ts">
import ListDivider from '@/components/simple/ListDivider.vue'
import ConversationItem from '@/components/views/WelcomeView/components/ConversationItem.vue'
import type { IConversationItem } from '@/types/conversation-item.ts'

const props = defineProps<{
  list: IConversationItem[];
}>();

</script>

<template>
  <div class="conversation-block">
    <p class="conversation-title">Conversations</p>
    <ul class="conversation-list">
      <template v-for="(item, index) in list" :key="index">
        <ConversationItem :item="item"/>
        <ListDivider v-if="index < list.length - 1"/>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.conversation-block {
  margin-left: 18px;
  margin-right: 18px;
  padding: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
  border-radius: 5px;
  background-color: #fff;
  color: #92929e;
}
@media (max-width: 420px) {
  .conversation-block {
    margin-left: 8px;
    margin-right: 8px;
  }
}

.conversation-title {
  font-size: 16px;
  padding: 0 8px;
  color: #545454;
}
.conversation-list {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 0;
}

</style>
