<script setup lang="ts">
import { ref } from 'vue';
import IconChat from '@/components/icons/IconChat.vue';
import IconClose from '@/components/icons/IconClose.vue';
import ButtonIcon from '@/components/simple/ButtonIcon.vue'

const isChatOpen = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};
</script>

<template>
  <div class="toggle-chat">
    <div class="toggle-wrapper">
      <ButtonIcon v-if="!isChatOpen" @click="toggleChat" class="toggle-icon">
        <IconChat />
      </ButtonIcon>

      <div v-else class="toggle-slot">
        <slot />

        <ButtonIcon @click.stop="toggleChat" class="toggle-icon">
          <IconClose />
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle-chat {
  position: fixed;
  bottom: 24px;
  right: 12px;
  z-index: 1000;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-slot {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.toggle-icon {
  position: relative;
  right: 12px;
}

</style>
