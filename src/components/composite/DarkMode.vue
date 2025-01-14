<script setup lang="ts">
import IconMoon from '../icons/IconMoon.vue'
import IconSun from '../icons/IconSun.vue'
import { inject } from 'vue'
const isDark = inject('isDark', false);
const toggleDark = inject('toggleDark', () => {});
</script>

<template>
  <div class="dark-mode">
    <p>Switch to {{isDark ? "Light" : "Dark"}} Theme</p>
    <button class="dark-mode-btn" @click="toggleDark()">
      <span class="dark-mode-btn-content" v-if="isDark"><IconMoon /> Dark</span>
      <span class="dark-mode-btn-content" v-else><IconSun /> Light</span>
    </button>
  </div>
</template>

<style scoped>
.dark-mode {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.dark-mode-btn {
  display: flex;
  align-items: center;
  padding: 3px 15px;
  background-color: var(--color-primary-background);
  border: none;
  outline: none;
  color: var(--color-text-secondary);
  margin: .5rem 0;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.dark-mode-btn-content {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: transparent;
}

</style>
