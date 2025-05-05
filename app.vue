<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
</script>

<template>
  <div>
    <BaseButton variant="ghost" size="lg"> this is a button </BaseButton>
    <BaseInput type="email" placeholder="you@example.com" />
  </div>
</template>
