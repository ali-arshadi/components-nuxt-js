<script setup lang="ts">
const props = defineProps<{ text: string }>();
const show = ref(false);
</script>

<template>
  <span
    class="tooltip-wrapper"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <slot />
    <span v-show="show" class="tooltip">{{ props.text }}</span>
  </span>
</template>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}
.tooltip {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #fff;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
}
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #111827;
}
</style>
