<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseRadio from '@/components/base/BaseRadio.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseTag from '@/components/base/BaseTag.vue';

import { ref } from 'vue';

type Tag = {
  id: number; // unique key for v-for
  label: string; // text shown inside the tag
  variant?: 'default' | 'success' | 'info' | 'warning' | 'danger';
};

const tags = ref<Tag[]>([
  { id: 1, label: 'Vue', variant: 'success' },
  { id: 2, label: 'Nuxt', variant: 'info' },
  { id: 3, label: 'JavaScript', variant: 'warning' },
  { id: 4, label: 'CSS', variant: 'default' },
  { id: 5, label: 'Tailwind? 🤫', variant: 'danger' },
]);
const countries = [
  { value: 'de', label: 'Germany' },
  { value: 'us', label: 'United States' },
];
</script>

<template>
  <div>
    <BaseButton variant="ghost" size="lg"> this is a button </BaseButton>
    <BaseInput type="email" placeholder="you@example.com" />
    <BaseTextarea
      :rows="6"
      size="lg"
      placeholder="Write something brilliant…"
    />
    <BaseSelect :options="countries" placeholder="Choose a country" />
    <BaseCheckbox label="Subscribe to newsletter?" />
    <br />
    <label for="shirt">shirt</label>
    <br />
    <BaseRadio
      v-for="size in ['sm', 'md', 'lg']"
      :key="size"
      :value="size"
      name="shirt"
    >
      {{ size.toUpperCase() }}
    </BaseRadio>
    <br />
    <BaseBadge variant="info">Draft</BaseBadge>
    <div class="tag-list">
      <BaseTag
        v-for="(tag, i) in tags"
        :key="tag.id"
        :variant="tag.variant"
        removable
        @remove="tags.splice(i, 1)"
      >
        {{ tag.label }}
      </BaseTag>
    </div>
  </div>
</template>
