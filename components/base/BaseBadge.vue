<!-- components/base/BaseBadge.vue -->
<script setup lang="ts">
const props = defineProps<{
  /** visual style */
  variant?: 'default' | 'success' | 'info' | 'warning' | 'danger';
  /** size scale */
  size?: 'sm' | 'md' | 'lg';
}>();

const variantClassMap: Record<string, string> = {
  default: 'badge--default',
  success: 'badge--success',
  info: 'badge--info',
  warning: 'badge--warning',
  danger: 'badge--danger',
};

const sizeClassMap: Record<string, string> = {
  sm: 'badge--sm',
  md: 'badge--md',
  lg: 'badge--lg',
};
</script>

<template>
  <span
    :class="[
      'badge',
      variantClassMap[props.variant ?? 'default'],
      sizeClassMap[props.size ?? 'md'],
    ]"
  >
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  border-radius: 9999px;
  font-weight: 500;
  line-height: 1;
  user-select: none;
}

/* Size modifiers */
.badge--sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.badge--md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
.badge--lg {
  padding: 0.375rem 1rem;
  font-size: 1rem;
}

/* Variants */
.badge--default {
  background-color: #e5e7eb;
  color: #374151;
}
.badge--success {
  background-color: #d1fae5;
  color: #065f46;
}
.badge--info {
  background-color: #dbeafe;
  color: #1e40af;
}
.badge--warning {
  background-color: #fef3c7;
  color: #92400e;
}
.badge--danger {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
