<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean; //* shows the spinner & block clicks
  disabled?: boolean; //* manual off-switch
}>();

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void;
}>();

//* Map variants & size to BEM-style class names

const variantClasses: Record<string, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
  danger: 'btn--danger',
};

const sizeClasses: Record<string, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :disabled="isDisabled"
    :class="[
      'btn',
      variantClasses[props.variant ?? 'primary'],
      sizeClasses[props.size ?? 'md'],
      { 'btn--disabled': isDisabled },
    ]"
    :aria-busy="props.loading ? 'true' : undefined"
    @click="(evt) => emit('click', evt)"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
    <slot v-if="props.loading" class="spinner" />
  </button>
</template>

<style>
.btn--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Variant modifiers */
.btn--primary {
  background-color: #2563eb;
  color: #ffffff;
}
.btn--primary:hover:not(.btn--disabled) {
  background-color: #1e4ed8;
}
.btn--primary:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn--secondary {
  background-color: #f3f4f6;
  color: #1f2937;
}
.btn--secondary:hover:not(.btn--disabled) {
  background-color: #e5e7eb;
}
.btn--secondary:focus-visible {
  outline: 2px solid #d1d5db;
  outline-offset: 2px;
}

.btn--ghost {
  background-color: transparent;
  color: #2563eb;
}
.btn--ghost:hover:not(.btn--disabled) {
  background-color: rgba(37, 99, 235, 0.1);
}
.btn--ghost:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn--danger {
  background-color: #dc2626;
  color: #ffffff;
}
.btn--danger:hover:not(.btn--disabled) {
  background-color: #b91c1c;
}
.btn--danger:focus-visible {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Disabled state */
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
</style>
