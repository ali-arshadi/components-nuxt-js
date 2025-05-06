<!-- components/base/BaseRadio.vue -->
<script setup lang="ts">
const props = defineProps<{
  /** v-model checked value of the radio group */
  modelValue: string | number | null;
  /** this radio's own value */
  value: string | number;
  /** optional label text (slot overrides) */
  label?: string;
  name?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'change', evt: Event): void;
}>();

const onChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', evt);
};
</script>

<template>
  <label :class="['radio', { 'radio--disabled': props.disabled }]">
    <input
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="props.modelValue === props.value"
      :disabled="props.disabled"
      class="radio__input"
      @change="onChange"
    />
    <span class="radio__circle" />
    <slot>{{ props.label }}</slot>
  </label>
</template>

<style scoped>
.radio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Hide native */
.radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Custom circle */
.radio__circle {
  width: 1rem;
  height: 1rem;
  border: 2px solid #6b7280; /* gray-500 */
  border-radius: 50%;
  background-color: #ffffff;
  transition: border-color 0.15s ease;
  position: relative;
}

/* Dot */
.radio__input:checked + .radio__circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #2563eb; /* blue-600 */
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.radio__input:checked + .radio__circle {
  border-color: #2563eb;
}

/* Focus ring */
.radio__input:focus-visible + .radio__circle {
  outline: 2px solid #3b82f6; /* blue-500 */
  outline-offset: 2px;
}
</style>
