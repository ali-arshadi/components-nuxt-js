<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseRadio from '@/components/base/BaseRadio.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';

const countries = [
  { value: 'de', label: 'Germany' },
  { value: 'us', label: 'United States' },
];
</script>

<template>
  <div>
    <BaseButton variant="ghost" size="lg"> this is a button </BaseButton>
    <BaseInput type="email" placeholder="you@example.com" />
    <BaseTextarea rows="6" size="lg" placeholder="Write something brilliant…" />
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
  </div>
</template>
