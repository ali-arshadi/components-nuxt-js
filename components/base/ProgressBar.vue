<!-- components/atoms/ProgressBar.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{ value: number; max?: number }>(), {
  max: 100,
});
const percent = computed(() => Math.min(100, (props.value / props.max) * 100));
</script>

<template>
  <div class="progress">
    <div class="progress__bar" :style="{ width: percent + '%' }" />
  </div>
</template>

<style scoped>
.progress {
  background: #e5e7eb;
  border-radius: var(--radius);
  overflow: hidden;
  height: 0.5rem;
}
.progress__bar {
  background: var(--clr-primary);
  height: 100%;
  transition: width 0.3s;
}
</style>
