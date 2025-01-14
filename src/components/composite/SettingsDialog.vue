<script setup lang="ts">
import ButtonIcon from '@/components/simple/ButtonIcon.vue'
import IconClose from '@/components/icons/IconClose.vue'
import SelectComp from '@/components/simple/SelectComp.vue'
import { inject, ref } from 'vue'
import DarkMode from '@/components/composite/DarkMode.vue'
import { useSettingsStore } from '@/stores/settings'
import IconTrash from '@/components/icons/IconTrash.vue'
import { getChatHistory } from '@/services/chatHistory.ts'

const resetChatManually = inject('resetChatManually')

const emit = defineEmits(['close'])
const isVisible = ref(true)
const settingsStore = useSettingsStore()

const handleOverlayClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.classList.contains('settings-dialog-overlay')) {
    closeDialog()
  }
}

const closeDialog = () => {
  isVisible.value = false
  setTimeout(() => emit('close'), 400)
}

console.log('getChatHistory().length', !getChatHistory().length)
</script>

<template>
  <transition name="overlay">
    <div v-if="isVisible" class="settings-dialog-overlay" @click="handleOverlayClick">
      <div class="settings-dialog-content">
        <div class="settings-dialog-close">
          <ButtonIcon class="settings-dialog-btn" @click="closeDialog">
            <IconClose />
          </ButtonIcon>
        </div>
        <h3 class="settings-dialog-title">Settings</h3>
        <div class="settings-dialog-list">
          <div class="settings-dialog-item">
            <p>How long should I keep my chat history?</p>
            <div class="settings-dialog-choose">
              <SelectComp
                :options="settingsStore.expirationOptions"
                v-model="settingsStore.selectedExpiration"
              />
              <button
                class="settings-dialog-remove"
                @click="resetChatManually"
                :disabled="!getChatHistory().length"
              >
                <IconTrash />
                Remove now
              </button>
            </div>
          </div>
          <div class="settings-dialog-item">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
  transform: translateY(34px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: all 0.2s ease-out;
}

.settings-dialog-overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.settings-dialog-content {
  position: relative;
  border-radius: 8px;
  text-align: center;
  padding: 4px 12px;
  width: 100%;
  height: 100%;
  margin: 12px;
  transform: translateY(34px);
  background: var(--color-background-optional);
}

.settings-dialog-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  padding: 4px;
}

.settings-dialog-btn {
  box-shadow: none;
  width: 100%;
  height: 100%;
  padding: 4px;
}

.settings-dialog-title {
  color: var(--color-text-primary);
}

.settings-dialog-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
  font-size: 14px;
  gap: 8px;
}

.settings-dialog-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  border-radius: 6px;
  padding: 6px 8px;
  background: var(--color-background-item);
  color: var(--color-text-primary);
}

.settings-dialog-choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.settings-dialog-remove {
  width: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background-color: var(--color-primary-background);
  border: none;
  outline: none;
  color: var(--color-text-secondary);
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
.settings-dialog-remove:disabled {
  opacity: 0.5;
  cursor: default;
}
.settings-dialog-remove:disabled:hover {
  background-color: var(--color-primary-background);
}

.settings-dialog-remove:hover {
  background-color: var(--color-primary-background-hover);
}

.settings-dialog-remove svg {
  width: 14px;
}
</style>
