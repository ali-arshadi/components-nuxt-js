<!-- components/base/BaseSelect.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /** v-model value */
  modelValue: string | number | null;
  /** array of { value, label } options */
  options: Array<{ value: string | number; label: string }>;
  /** small / medium / large */
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  /** error message triggers error state */
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'change', evt: Event): void;
}>();

const onChange = (evt: Event) => {
  const target = evt.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
  emit('change', evt);
};

const selectClass = computed(() => [
  'select',
  `select--${props.size ?? 'md'}`,
  {
    'select--disabled': props.disabled,
    'select--error': !!props.error,
  },
]);
</script>

<template>
  <select
    :value="props.modelValue ?? ''"
    :disabled="props.disabled"
    :class="selectClass"
    @change="onChange"
  >
    <option v-if="props.placeholder" disabled value="">
      {{ props.placeholder }}
    </option>
    <option v-for="opt in props.options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

<style scoped>
.select {
  display: block;
  width: 100%;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #111827; /* gray-900 */
  padding: 0.5rem 2.5rem 0.5rem 0.875rem; /* leave space for arrow */
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23111827'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.338l3.71-4.106a.75.75 0 111.1 1.02l-4.25 4.71a.75.75 0 01-1.1 0l-4.25-4.71a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.select:focus {
  outline: none;
  border-color: #2563eb; /* blue-600 */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

/* Size modifiers */
.select--sm {
  padding: 0.375rem 2.5rem 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.select--md {
  padding: 0.5rem 2.5rem 0.5rem 0.875rem;
  font-size: 1rem;
}

.select--lg {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1.125rem;
}

/* Disabled */
.select--disabled {
  background-color: #f9fafb; /* gray-50 */
  color: #9ca3af; /* gray-400 */
  cursor: not-allowed;
}

/* Error */
.select--error {
  border-color: #dc2626; /* red-600 */
}
.select--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}
</style>
