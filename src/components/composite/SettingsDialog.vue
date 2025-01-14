<script setup lang="ts">
import ButtonIcon from '@/components/simple/ButtonIcon.vue'
import IconClose from '@/components/icons/IconClose.vue'
import SelectComp from '@/components/simple/SelectComp.vue'
import { ref, watch } from 'vue'
import { clearChatHistory } from '@/shared/dbHelpers.ts'
import DarkMode from '@/components/composite/DarkMode.vue'

const emit = defineEmits(['close'])
const isVisible = ref(true)

const expirationOptions = ref([
  { text: '1 min', value: '1' },
  { text: '5 min', value: '5' },
  { text: '10 min', value: '10' },
  { text: '30 min', value: '30' },
  { text: '4 hour', value: '240' },
  { text: '1 day', value: '1440' },
  { text: '1 week', value: '10080' },
])

const selectedExpiration = ref(expirationOptions.value[1].value) // Default: 5 min

const handleOverlayClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.classList.contains('settings-dialog-overlay')) {
    closeDialog()
  }
}

const closeDialog = () => {
  isVisible.value = false
  setTimeout(() => emit('close'), 200)
}

watch(selectedExpiration, (newValue) => {
  console.log(`History expiration updated to ${newValue} minutes.`)
  clearChatHistory()
})
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
            <p>How long does the history last?</p>
            <SelectComp :options="expirationOptions" v-model="selectedExpiration" />
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
  width: 100%;
  border-radius: 6px;
  padding: 4px 8px;
  background: var(--color-background-item);
  color: var(--color-text-primary);
}
</style>
