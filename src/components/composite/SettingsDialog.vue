<script setup lang="ts">
import ButtonIcon from '@/components/simple/ButtonIcon.vue'
import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits(['close']);

const handleOverlayClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains('dialog-info-overlay')) {
    emit('close');
  }
};
</script>

<template>
  <div class="settings-dialog-overlay" @click="handleOverlayClick">
    <div class="settings-dialog-content">
      <div class="settings-dialog-close">
        <ButtonIcon class="settings-dialog-btn" @click="emit('close')">
          <IconClose />
        </ButtonIcon>
      </div>
      <h3>Settings</h3>
      <slot />
    </div>
  </div>
</template>

<style>
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
  background: white;
  border-radius: 8px;
  text-align: center;
  padding: 8px 16px;
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

</style>
