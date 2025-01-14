<script setup lang="ts">
import ToggleChat from '@/components/composite/ToggleChat.vue'
import WidgetContent from '@/components/WidgetContent.vue'
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, provide, ref, watch } from 'vue'
import { initDB, loadChatHistory } from '@/shared/dbHelpers.ts'
import { addMessageToHistory, clearMessageFromHistory } from '@/services/chatHistory.ts'
import { useSettingsStore } from '@/stores/settings.ts'
import { DELAY_WIDGET_SHOW, TIME_RATIO } from '@/shared/const.ts'
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
  }, DELAY_WIDGET_SHOW);
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
  return +settingsStore.selectedExpiration * TIME_RATIO;
}

const handleClearChatHistory = async ():void => {
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

  console.log(`Timer set for ${expirationTime / TIME_RATIO} minutes.`);
};

const resetChat = ():boolean => {
  chatEnded.value = true;
};

const resetChatManually = async ():void => {
  chatEnded.value = false;
  await clearMessageFromHistory();
  console.log('Chat history cleared manually.');
  startClearChatTimer();
};
provide('resetChatManually', resetChatManually)

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
