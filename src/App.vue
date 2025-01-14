<script setup lang="ts">
import ToggleChat from '@/components/composite/ToggleChat.vue'
import WidgetContent from '@/components/WidgetContent.vue'
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { initDB, loadChatHistory } from '@/shared/dbHelpers.ts'
import { addMessageToHistory, clearMessageFromHistory } from '@/services/chatHistory.ts'
import { useSettingsStore } from '@/stores/settings.ts'
const isWidgetVisible = ref(false)

const chatEnded = ref(false);
provide('chatEnded', chatEnded);

const isDark = useDark();
const toggleDark = useToggle(isDark);
provide('isDark', isDark);
provide('toggleDark', toggleDark);

const settingsStore = useSettingsStore()
let clearChatTimer: NodeJS.Timeout | null = null;

const delayWidgetShow = () => {
  setTimeout(() => {
    isWidgetVisible.value = true;
  }, 7000); // 7 sec
}

onMounted(async () => {
  await initDB();
  delayWidgetShow();
  const history = await loadChatHistory();
  history.forEach((message) => addMessageToHistory(message, false));

  startClearChatTimer();
});

const transformToMs = () => {
  return +settingsStore.selectedExpiration * 60000; // * 60 * 1000
}

const handleClearChatHistory = async () => {
  await clearMessageFromHistory();
  chatEnded.value = false;
  console.log('Chat history cleared.');
};

const startClearChatTimer = () => {
  if (clearChatTimer) clearTimeout(clearChatTimer);

  const expirationTime = transformToMs();
  clearChatTimer = setTimeout(() => {
    handleClearChatHistory();
  }, expirationTime);

  console.log(`Timer set for ${expirationTime / 1000 / 60} minutes.`);
};

const resetChat = () => {
  chatEnded.value = true;
};

const resetChatManually = async () => {
  chatEnded.value = false;
  await clearMessageFromHistory();
  console.log('Chat history cleared manually.');
  startClearChatTimer();
};
provide('resetChatManually', resetChatManually)

// chatEnded фолс, если не достигнуто maxMessages или было обновление страницы

watch(() => settingsStore.selectedExpiration, (newValue) => {
  console.log(`Expiration time changed to ${newValue} minutes.`);
  startClearChatTimer();
});

console.log('settingsStore', settingsStore.selectedExpiration)
</script>


<template>
  <ToggleChat v-if="isWidgetVisible">
    <WidgetContent @resetChat="resetChat"/>
  </ToggleChat>
</template>
