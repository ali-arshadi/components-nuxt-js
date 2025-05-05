<!-- components/base/BaseTag.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'default' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'remove'): void;
  (e: 'click', evt: MouseEvent): void;
}>();

const variantClassMap: Record<string, string> = {
  default: 'tag--default',
  success: 'tag--success',
  info: 'tag--info',
  warning: 'tag--warning',
  danger: 'tag--danger',
};

const sizeClassMap: Record<string, string> = {
  sm: 'tag--sm',
  md: 'tag--md',
  lg: 'tag--lg',
};

const tagClass = computed(() => [
  'tag',
  variantClassMap[props.variant ?? 'default'],
  sizeClassMap[props.size ?? 'md'],
  { 'tag--disabled': props.disabled },
]);

const onRemove = (evt: MouseEvent) => {
  evt.stopPropagation();
  emit('remove');
};

const onClick = (evt: MouseEvent) => {
  if (!props.disabled) emit('click', evt);
};
</script>

<template>
  <span :class="tagClass" @click="onClick">
    <slot />
    <button
      v-if="props.removable"
      class="tag__close"
      type="button"
      aria-label="Remove tag"
      @click="onRemove"
    >
      ×
    </button>
  </span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  font-weight: 500;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.tag--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Size modifiers */
.tag--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.tag--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
.tag--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

/* Variants */
.tag--default {
  background-color: #e5e7eb;
  color: #374151;
}
.tag--success {
  background-color: #bbf7d0;
  color: #064e3b;
}
.tag--info {
  background-color: #bfdbfe;
  color: #1e3a8a;
}
.tag--warning {
  background-color: #fde68a;
  color: #7c2d12;
}
.tag--danger {
  background-color: #fecaca;
  color: #7f1d1d;
}

/* Close button */
.tag__close {
  border: none;
  background: transparent;
  font-size: 1em;
  line-height: 1;
  padding: 0 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tag__close:hover:not(:disabled) {
  opacity: 0.75;
}
.tag__close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
