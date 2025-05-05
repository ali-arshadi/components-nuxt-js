<!-- components/base/BaseImg.vue -->
<script setup lang="ts">
import { computed } from 'vue';
// Nuxt 3 auto‑imports <NuxtImg> from @nuxt/image. Explicit import for type safety:
import { NuxtImg } from '#components';

const props = defineProps<{
  /** image source — absolute URL or path resolved by nuxt‑image provider */
  src: string;
  /** alt text for accessibility */
  alt?: string;
  /** intrinsic width / height (numbers => px) */
  width?: number | string;
  height?: number | string;
  /** responsive sizes attribute, e.g. "(max-width: 768px) 100vw, 768px" */
  sizes?: string;
  /** image quality (0‑100). Provider‑specific. */
  quality?: number;
  /** output format (e.g. webp, avif, jpg) */
  format?: string;
  /** placeholder mode: true → blur, 'empty', or custom base64/URL */
  placeholder?: boolean | 'blur' | 'empty' | string;
  /** when true, load eagerly (good for LCP hero) */
  priority?: boolean;
  /** make element 100% width + auto height */
  responsive?: boolean;
  /** object-fit rule */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** pass extra classes down */
  class?: string | string[] | Record<string, boolean>;
}>();

// Map props to <NuxtImg> attrs
const nuxtImgProps = computed(() => ({
  src: props.src,
  alt: props.alt,
  width: props.width,
  height: props.height,
  sizes: props.sizes,
  quality: props.quality,
  format: props.format,
  placeholder: props.placeholder ?? true,
  loading: props.priority ? 'eager' : 'lazy',
  decoding: 'async',
}));
</script>

<template>
  <NuxtImg
    v-bind="nuxtImgProps"
    :class="[
      'base-img',
      props.class,
      { 'base-img--responsive': props.responsive },
    ]"
    :style="props.objectFit ? { objectFit: props.objectFit } : undefined"
  />
</template>

<style scoped>
.base-img {
  display: block;
  /* Prevent CLS by reserving space when width/height provided */
  max-width: 100%;
}
.base-img--responsive {
  width: 100%;
  height: auto;
}
</style>
