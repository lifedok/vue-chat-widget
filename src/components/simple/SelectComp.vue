<script setup lang="ts">

defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <div class="select-comp">
    <div>Selected:</div>
    <select
      class="select-comp-input"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-comp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.select-comp-input {
  border: none;
  border-radius: 3px;
}
</style>
