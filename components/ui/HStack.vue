<!-- components/layout/HStack.vue -->
<script setup lang="ts">
import Stack from './Stack.vue';

const props = defineProps<{
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  class?: string | string[] | Record<string, boolean>;
}>();
</script>

<template>
  <!-- Pass all props through and fix direction to horizontal -->
  <Stack v-bind="props" direction="horizontal">
    <slot />
  </Stack>
</template>
