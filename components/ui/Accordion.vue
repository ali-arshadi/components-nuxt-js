<script setup lang="ts">
interface Item {
  title: string;
  key: string;
}
const props = defineProps<{ items: Item[] }>();
const openKey = ref<string | null>(null);
</script>

<template>
  <div>
    <div v-for="item in props.items" :key="item.key">
      <button
        class="title"
        @click="openKey = openKey === item.key ? null : item.key"
      >
        {{ item.title }}
      </button>
      <div v-show="openKey === item.key" class="panel">
        <slot :name="item.key" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  width: 100%;
  text-align: left;
  background: #f3f4f6;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.panel {
  border: 1px solid #e5e7eb;
  border-top: none;
  padding: 16px;
  border-radius: 0 0 8px 8px;
}
</style>
