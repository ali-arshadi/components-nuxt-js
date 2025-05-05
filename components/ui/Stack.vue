<!-- components/layout/Stack.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** stacking direction */
    direction?: 'horizontal' | 'vertical';
    /** gap between children; number ⇒ px, string ⇒ raw */
    gap?: number | string;
    /** flex‑box alignment */
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    /** main‑axis justification */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    /** allow wrapping (for horizontal stacks) */
    wrap?: boolean;
    /** additional classes */
    class?: string | string[] | Record<string, boolean>;
  }>(),
  {
    direction: 'vertical',
    gap: 0,
    align: 'start',
    justify: 'start',
    wrap: false,
  }
);

const stackStyle = computed(() => {
  const style: Record<string, string> = {
    display: 'flex',
    flexDirection: props.direction === 'vertical' ? 'column' : 'row',
    gap: typeof props.gap === 'number' ? `${props.gap}px` : String(props.gap),
    alignItems:
      props.align === 'start'
        ? 'flex-start'
        : props.align === 'end'
        ? 'flex-end'
        : props.align,
    justifyContent:
      props.justify === 'start'
        ? 'flex-start'
        : props.justify === 'end'
        ? 'flex-end'
        : props.justify === 'between'
        ? 'space-between'
        : props.justify === 'around'
        ? 'space-around'
        : props.justify === 'evenly'
        ? 'space-evenly'
        : props.justify,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
  };
  return style;
});
</script>

<template>
  <div :class="['stack', props.class]" :style="stackStyle">
    <slot />
  </div>
</template>

<style scoped>
.stack {
  box-sizing: border-box;
}
</style>
