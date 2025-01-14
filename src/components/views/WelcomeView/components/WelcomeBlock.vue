<script setup lang="ts">
</script>

<template>
  <div class="welcome-block">
    <span class="welcome-header">
    Hi there 👋
  </span>
    <div class="welcome-description">
      Need help? Search our help center for answers or start a conversation:
    </div>
  </div>
</template>

<style scoped>
.welcome-block {
  margin-bottom: -36px;
  padding: 16px 30px 30px;
  background: var(--color-primary-background);
}

@media (max-width: 420px) {
  .welcome-block {
    margin-bottom: -28px;
    padding: 16px 18px 18px;
  }
}

.welcome-header {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text-secondary);
}
@media (max-width: 420px) {
  .welcome-header {
    font-size: 26px;
  }
}
.welcome-description {
  margin: 10px 0;
  font-size: 16px;
  color: var(--color-text-secondary);
}

@media (max-width: 420px) {
  .welcome-description {
    font-size: 14px;
  }
}

</style>
