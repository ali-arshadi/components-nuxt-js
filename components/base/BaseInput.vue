<!-- components/base/BaseInput.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /** v-model value */
  modelValue: string | number | null;
  /** HTML input type, e.g. text, email, password */
  type?: string;
  /** small / medium / large sizing */
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  /** error message (truthy => error state) */
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'change', evt: Event): void;
}>();

const onInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const onChange = (evt: Event) => {
  emit('change', evt);
};

// Compute classes once for perf & clarity
const inputClass = computed(() => [
  'input',
  `input--${props.size ?? 'md'}`,
  {
    'input--disabled': props.disabled,
    'input--error': !!props.error,
  },
]);
</script>

<template>
  <input
    :type="props.type ?? 'text'"
    :value="props.modelValue ?? ''"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="inputClass"
    @input="onInput"
    @change="onChange"
  />
</template>

<style scoped>
.input {
  display: block;
  width: 100%;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem; /* 6px */
  background-color: #ffffff;
  color: #111827; /* gray-900 */
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input:focus {
  outline: none;
  border-color: #2563eb; /* blue-600 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

/* Size modifiers */
.input--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.input--md {
  padding: 0.5rem 0.875rem;
  font-size: 1rem;
}

.input--lg {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

/* Disabled */
.input--disabled {
  background-color: #f9fafb; /* gray-50 */
  color: #9ca3af; /* gray-400 */
  cursor: not-allowed;
}

/* Error */
.input--error {
  border-color: #dc2626; /* red-600 */
}
.input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}
</style>
