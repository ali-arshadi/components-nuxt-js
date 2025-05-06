<script setup lang="ts">
const props = withDefaults(defineProps<{ value: number; max?: number }>(), {
  max: 100,
});
const percent = computed(() => Math.min(100, (props.value / props.max) * 100));
</script>

<template>
  <div class="progress">
    <div class="bar" :style="{ width: percent + '%' }" />
  </div>
</template>

<style scoped>
.progress {
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  height: 8px;
}
.bar {
  background: #4f46e5;
  height: 100%;
  transition: width 0.3s;
}
</style>
