<script setup lang="ts">
interface Tab {
  key: string;
  label: string;
}
const props = defineProps<{ tabs: Tab[]; modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

<template>
  <div class="tabs">
    <button
      v-for="t in props.tabs"
      :key="t.key"
      :class="['trigger', t.key === props.modelValue && 'active']"
      @click="emit('update:modelValue', t.key)"
    >
      {{ t.label }}
    </button>
    <div class="panel">
      <slot :active="props.modelValue" />
    </div>
  </div>
</template>

<style scoped>
.trigger {
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  color: #6b7280;
}
.trigger:hover {
  color: #4f46e5;
}
.active {
  color: #4f46e5;
  border-bottom-color: #4f46e5;
}
.panel {
  padding-top: 16px;
}
</style>
