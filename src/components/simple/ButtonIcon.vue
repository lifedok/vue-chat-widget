<template>
  <button class="btn-icon">
    <slot />
  </button>
</template>

<style>
.btn-icon {
  color: var(--color-text-secondary);
  cursor: pointer;
  background-color: var(--color-primary-background);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 60px;
  height: 60px;
  border: none;
}
</style>
