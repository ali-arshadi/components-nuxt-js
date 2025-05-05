<!-- components/layout/Card.vue -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** solid (default) or thin border */
    variant?: 'solid' | 'outlined';
    /** none, sm (1rem), md (1.5rem), lg (2rem) */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** drop‑shadow on / off */
    shadow?: boolean;
    /** lift shadow & translate on hover */
    hoverable?: boolean;
    /** emit click; add pointer */
    clickable?: boolean;
  }>(),
  {
    variant: 'solid',
    padding: 'md',
    shadow: true,
    hoverable: false,
    clickable: false,
  }
);

const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void;
}>();

const onClick = (evt: MouseEvent) => {
  if (props.clickable) emit('click', evt);
};
</script>

<template>
  <article
    :class="[
      'card',
      `card--pad-${props.padding}`,
      `card--${props.variant}`,
      {
        'card--shadow': props.shadow,
        'card--hover': props.hoverable,
        'card--clickable': props.clickable,
      },
    ]"
    @click="onClick"
  >
    <header v-if="$slots.header" class="card__header">
      <slot name="header" />
    </header>

    <div class="card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped>
.card {
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #111827; /* gray-900 */
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

/* Variant: outlined */
.card--outlined {
  background-color: #ffffff;
  border: 1px solid #e5e7eb; /* gray-200 */
}

/* Shadow */
.card--shadow {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Hoverable lift */
.card--hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Clickable cursor */
.card--clickable {
  cursor: pointer;
}

/* Padding scale */
.card--pad-none {
  padding: 0;
}
.card--pad-sm {
  padding: 1rem;
}
.card--pad-md {
  padding: 1.5rem;
}
.card--pad-lg {
  padding: 2rem;
}

/* Header & footer styling */
.card__header {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.125rem; /* 18px */
}
.card__footer {
  margin-top: 1rem;
}
</style>
