<!-- components/base/BaseTextarea.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /** v-model value */
  modelValue: string | null;
  /** textarea rows attribute */
  rows?: number;
  /** responsive sizing */
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  /** error message triggers error state */
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'change', evt: Event): void;
}>();

const onInput = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const onChange = (evt: Event) => {
  emit('change', evt);
};

const textareaClass = computed(() => [
  'textarea',
  `textarea--${props.size ?? 'md'}`,
  {
    'textarea--disabled': props.disabled,
    'textarea--error': !!props.error,
  },
]);
</script>

<template>
  <textarea
    :rows="props.rows ?? 4"
    :value="props.modelValue ?? ''"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="textareaClass"
    @input="onInput"
    @change="onChange"
  />
</template>

<style scoped>
.textarea {
  display: block;
  width: 100%;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #111827; /* gray-900 */
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.textarea:focus {
  outline: none;
  border-color: #2563eb; /* blue-600 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

/* Size modifiers */
.textarea--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.textarea--md {
  padding: 0.5rem 0.875rem;
  font-size: 1rem;
}

.textarea--lg {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

/* Disabled */
.textarea--disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

/* Error */
.textarea--error {
  border-color: #dc2626;
}
.textarea--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}
</style>
