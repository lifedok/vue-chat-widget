<script setup lang="ts">
import { inject, ref } from 'vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import SettingsDialog from '@/components/composite/SettingsDialog.vue'
const toggleView = inject('toggleView');

const showDialogInfo = ref(false);
const openDialogInfo = () => {
  showDialogInfo.value = true;
};

const closeDialogInfo = () => {
  showDialogInfo.value = false;
};
</script>

<template>
  <div class="chat-header">
    <button class="chat-header-action" @click="toggleView">
      <IconChevronLeft/>
    </button>

    <button
      :class="[{'chat-header-action': true, 'chat-header-action--isActive': showDialogInfo}]"
      @click="openDialogInfo">
      <IconBurger/>
    </button>
  </div>

  <SettingsDialog v-if="showDialogInfo" @close="closeDialogInfo"/>
</template>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary-background);
  padding: 16px;
}
.chat-header-action {
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-background);
  color: var(--color-text-secondary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.chat-header-action:hover {
  background-color: var(--color-primary-background-active);
}
.chat-header-action--isActive {
  background-color: var(--color-primary-background-active);
}
</style>

