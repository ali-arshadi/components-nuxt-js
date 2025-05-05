<!-- components/base/LazyImg.vue -->
<script setup lang="ts">
/*
 * LazyImg – wraps BaseImg with a CSS skeleton and intersection‑observer fade‑in.
 * Relies on Nuxt‑Image's built‑in lazy loading plus an onload event.
 */
import { ref } from 'vue';
import BaseImg from './BaseImg.vue';

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    sizes?: string;
    quality?: number;
    format?: string;
    placeholder?: boolean | 'blur' | 'empty' | string;
    /** skeleton theme color */
    skeletonColor?: string;
    /** when true, full‑width responsive */
    responsive?: boolean;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    class?: string | string[] | Record<string, boolean>;
  }>(),
  {
    placeholder: 'blur',
    skeletonColor: '#e5e7eb',
  }
);

const loaded = ref(false);
const onLoad = () => {
  loaded.value = true;
};
</script>

<template>
  <div
    :class="['lazy-img-wrapper', props.class]"
    :style="props.responsive ? 'width:100%' : undefined"
  >
    <BaseImg
      v-bind="props"
      :priority="false"
      @load="onLoad"
      :class="['lazy-img', { 'lazy-img--loaded': loaded }]"
    />
    <div
      v-if="!loaded"
      class="lazy-img__skeleton"
      :style="{
        background: `linear-gradient(90deg, ${props.skeletonColor} 25%, #f3f4f6 50%, ${props.skeletonColor} 75%)`,
      }"
    />
  </div>
</template>

<style scoped>
.lazy-img-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.lazy-img {
  opacity: 0;
  transition: opacity 0.3s ease;
  display: block;
}
.lazy-img--loaded {
  opacity: 1;
}

/* Skeleton shimmer */
.lazy-img__skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: shimmer 1.2s infinite linear forwards;
  background-size: 200% 100%;
}

@keyframes shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}
</style>
