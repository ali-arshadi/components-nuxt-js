<!-- components/layout/Section.vue -->
<script setup lang="ts">
const props = defineProps<{
  /** vertical padding scale */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** background tone */
  background?: 'none' | 'muted' | 'primary' | 'dark';
}>();
</script>

<template>
  <section
    :class="[
      'section',
      `section--pad-${props.padding ?? 'md'}`,
      `section--bg-${props.background ?? 'none'}`,
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
.section {
  width: 100%;
}

/* Padding variants */
.section--pad-none {
  padding-block: 0;
}
.section--pad-sm {
  padding-block: 1rem;
}
.section--pad-md {
  padding-block: 2rem;
}
.section--pad-lg {
  padding-block: 4rem;
}

/* Background variants */
.section--bg-none {
}
.section--bg-muted {
  background-color: #f9fafb;
}
.section--bg-primary {
  background-color: #2563eb;
  color: #ffffff;
}
.section--bg-dark {
  background-color: #111827;
  color: #ffffff;
}
</style>
