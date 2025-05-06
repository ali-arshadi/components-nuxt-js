<script setup lang="ts">
interface Column<T> {
  key: keyof T;
  label: string;
}
const props = defineProps<{ rows: any[]; columns: Column<any>[] }>();
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="c in props.columns" :key="c.key as string">
          {{ c.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, idx) in props.rows" :key="idx">
        <td v-for="c in props.columns" :key="c.key as string">
          <slot :name="c.key as string" v-bind="{ value: row[c.key], row }">
            {{ row[c.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}
th,
td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
}
th {
  background: #f3f4f6;
  text-align: left;
}
tr:nth-child(even) td {
  background: #fafafa;
}
</style>
