<script setup lang="ts">

import { nextTick, onMounted, ref } from 'vue'
import IconSendHorizontal from '@/components/icons/IconSendHorizontal.vue'

const props = defineProps({
  isDisabledBtn: {
    type: Boolean,
    required: true
  }
})

const rowHeight = 16;
const textareaHeight = ref(rowHeight);

const message = ref("");
const textarea = ref<HTMLTextAreaElement | null>(null);
const maxRows = 8;
const emit = defineEmits<{
  (event: 'sendMessage', message: string): void;
}>();

const adjustTextareaHeight = async () => {
  if (textarea.value) {
    textarea.value.style.height = "auto";
    await nextTick();
    const scrollHeight = textarea.value.scrollHeight;
    const maxHeight = rowHeight * maxRows;

    textareaHeight.value = Math.min(scrollHeight, maxHeight);
    textarea.value.style.height = `${textareaHeight.value}px`;
  }
}

const sendMessage = () => {
  if (props.isDisabledBtn || !message.value.trim()) {
    return;
  }

  emit("sendMessage", message.value.trim())
  message.value = ""
  textareaHeight.value = rowHeight
}

onMounted(() => {
  textareaHeight.value = rowHeight;
});

</script>

<template>
  <div class="chat-footer">
    <textarea
      ref="textarea"
      v-model="message"
      rows="1"
      @input="adjustTextareaHeight"
      :placeholder="'Type here and press enter..'"
      @keydown.enter.prevent="sendMessage"
      :style="{ height: textareaHeight + 'px' }"
    />
    <div class="chat-actions-part">
      <button
        v-if="message.trim()"
        @click="sendMessage"
        class="chat-footer-button"
        :disabled="isDisabledBtn"
      >
        <IconSendHorizontal/>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-footer {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}
.chat-footer textarea {
  font-size: 14px;
  line-height: 16px;

  flex: 1;
  padding: 0 5px;
  border: none;
  outline: none;
  resize: none;
}
.chat-footer textarea::placeholder {
  font-size: 14px;
  line-height: 16px;
  color: #ccc;
  letter-spacing: -1.5px;
  padding: 0;
  overflow: hidden;
}

.chat-actions-part {
  min-width: 32px;
  height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
}
.chat-footer-button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--color-primary-background);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
}
.chat-footer-button:hover {
  opacity: .7;
}
.chat-footer-button:disabled {
  opacity: .5;
  cursor: default;
}
.chat-footer-button:disabled:hover {
  opacity: .5;
}
</style>
