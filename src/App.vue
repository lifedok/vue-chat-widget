<script setup lang="ts">
import ToggleChat from '@/components/composite/ToggleChat.vue'
import WidgetContent from '@/components/WidgetContent.vue'
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, provide } from 'vue'
import { initDB, loadChatHistory } from '@/shared/dbHelpers.ts'
import { addMessageToHistory } from '@/services/chatHistory.ts'

const isDark = useDark();
const toggleDark = useToggle(isDark);
provide('isDark', isDark);
provide('toggleDark', toggleDark);

onMounted(async () => {
  await initDB();
  const history = await loadChatHistory();
  history.forEach((message) => addMessageToHistory(message, false));
});

</script>


<template>
  <ToggleChat>
    <WidgetContent/>
  </ToggleChat>
</template>
