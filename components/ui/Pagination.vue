<script setup lang="ts">
const props = withDefaults(
  defineProps<{ page: number; total: number; perPage?: number }>(),
  { perPage: 10 }
);
const emit = defineEmits<{ (e: 'update:page', v: number): void }>();
const pages = computed(() => Math.ceil(props.total / props.perPage));
</script>

<template>
  <nav v-if="pages > 1" class="pager">
    <button
      :disabled="props.page === 1"
      @click="emit('update:page', props.page - 1)"
    >
      «
    </button>

    <button
      v-for="n in pages"
      :key="n"
      :class="n === props.page && 'active'"
      @click="emit('update:page', n)"
    >
      {{ n }}
    </button>

    <button
      :disabled="props.page === pages"
      @click="emit('update:page', props.page + 1)"
    >
      »
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  gap: 4px;
}
.pager button {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
}
.active {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
