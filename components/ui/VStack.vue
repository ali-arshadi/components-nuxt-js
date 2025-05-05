<!-- components/layout/VStack.vue -->
<script setup lang="ts">
import Stack from './Stack.vue';

const props = defineProps<{
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  class?: string | string[] | Record<string, boolean>;
}>();
</script>

<template>
  <!-- Pass all props through and default direction vertical (Stack already vertical by default) -->
  <Stack v-bind="props">
    <slot />
  </Stack>
</template>
