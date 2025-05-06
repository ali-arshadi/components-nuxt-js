<!-- components/base/BaseCheckbox.vue -->
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  /** v-model binding */
  modelValue: boolean;
  /** optional label text (slot overrides) */
  label?: string;
  disabled?: boolean;
  /** sets the indeterminate visual state */
  indeterminate?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', evt: Event): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const setIndeterminate = () => {
  if (inputRef.value) {
    inputRef.value.indeterminate = !!props.indeterminate && !props.modelValue;
  }
};

onMounted(setIndeterminate);
watch(() => props.indeterminate, setIndeterminate);
watch(() => props.modelValue, setIndeterminate);

const onChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('change', evt);
};
</script>

<template>
  <label :class="['checkbox', { 'checkbox--disabled': props.disabled }]">
    <input
      ref="inputRef"
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      class="checkbox__input"
      @change="onChange"
    />
    <span class="checkbox__box" />
    <slot>{{ props.label }}</slot>
  </label>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Visually hide the native input */
.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Custom checkbox square */
.checkbox__box {
  width: 1rem;
  height: 1rem;
  border: 2px solid #6b7280; /* gray-500 */
  border-radius: 0.25rem;
  background-color: #ffffff;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  position: relative;
}

/* Checkmark */
.checkbox__input:checked + .checkbox__box {
  background-color: #2563eb; /* blue-600 */
  border-color: #2563eb;
}

.checkbox__input:checked + .checkbox__box::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 0px;
  width: 6px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Indeterminate bar */
.checkbox__input:indeterminate + .checkbox__box {
  background-color: #2563eb;
  border-color: #2563eb;
}

.checkbox__input:indeterminate + .checkbox__box::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 2px;
  width: 10px;
  height: 2px;
  background-color: #ffffff;
  transform: translateY(-50%);
}

/* Focus ring */
.checkbox__input:focus-visible + .checkbox__box {
  outline: 2px solid #3b82f6; /* blue-500 */
  outline-offset: 2px;
}
</style>
