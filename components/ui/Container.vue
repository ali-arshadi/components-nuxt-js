<!-- components/layout/Container.vue -->
<script setup lang="ts">
const props = defineProps<{
  /** width breakpoint or fluid */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid';
  /** horizontal padding toggle */
  padded?: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'container',
      `container--${props.size ?? 'lg'}`,
      { 'container--padded': props.padded !== false },
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.container--sm {
  max-width: 640px;
}
.container--md {
  max-width: 768px;
}
.container--lg {
  max-width: 1024px;
}
.container--xl {
  max-width: 1280px;
}
.container--2xl {
  max-width: 1536px;
}
.container--fluid {
  max-width: none;
}

/* Padding */
.container--padded {
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (min-width: 640px) {
  .container--padded {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
