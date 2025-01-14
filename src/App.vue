<script setup lang="ts">
import ToggleChat from '@/components/composite/ToggleChat.vue'
import WidgetContent from '@/components/WidgetContent.vue'
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { initDB, loadChatHistory } from '@/idb/dbHelpers.ts'
import { addMessageToHistory, clearMessageFromHistory } from '@/services/chatHistory.ts'
import { useSettingsStore } from '@/stores/settings.ts'
import { DELAY_WIDGET_SHOW_MS, TIME_RATIO_MS } from '@/shared/const.ts'
const isWidgetVisible = ref(false)
const currentMessageCount = ref(0);
provide('currentMessageCount', currentMessageCount);

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
  }, DELAY_WIDGET_SHOW_MS);
}

onMounted(async () => {
  await initDB();
  delayWidgetShow();
  const history = await loadChatHistory();
  history.forEach((message) => addMessageToHistory(message, false));
  currentMessageCount.value = 0;

  startClearChatTimer();
});

const transformToMs = ():number => {
  return settingsStore.selectedExpiration * TIME_RATIO_MS;
}

const handleResetChatHistory = async ():void => {
  chatEnded.value = false;
  currentMessageCount.value = 0;
  await clearMessageFromHistory();
  startClearChatTimer();
  console.log('Chat history cleared.');
};

const startClearChatTimer = () => {
  if (clearChatTimer) clearTimeout(clearChatTimer);

  const expirationTime = transformToMs();
  clearChatTimer = setTimeout(() => {
    handleResetChatHistory();
  }, expirationTime);

  console.log(`Timer set for ${expirationTime / TIME_RATIO_MS} minutes.`);
};

const resetChat = ():boolean => {
  chatEnded.value = true;
};

provide('resetChatManually', handleResetChatHistory)

watch(() => settingsStore.selectedExpiration, (newValue) => {
  console.log(`Expiration time changed to ${newValue} minutes.`);
  settingsStore.updateSelectedExpiration(newValue);
  startClearChatTimer();
});

</script>


<template>
  <ToggleChat v-if="isWidgetVisible">
    <WidgetContent @resetChat="resetChat"/>
  </ToggleChat>
</template>
