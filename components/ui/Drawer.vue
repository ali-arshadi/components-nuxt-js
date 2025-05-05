<!-- components/overlay/Drawer.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    /** v-model open state */
    modelValue: boolean;
    /** side of the screen */
    side?: 'left' | 'right';
    /** drawer width */
    width?: string | number;
    /** click overlay to close */
    closeOnOverlay?: boolean;
    /** escape key to close */
    closeOnEsc?: boolean;
    /** lock body scroll */
    scrollLock?: boolean;
  }>(),
  {
    side: 'right',
    width: '20rem',
    closeOnOverlay: true,
    closeOnEsc: true,
    scrollLock: true,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

const lock = () => {
  if (props.scrollLock) document.body.style.overflow = 'hidden';
};
const unlock = () => {
  if (props.scrollLock) document.body.style.overflow = '';
};

onMounted(() => {
  if (props.modelValue) lock();
});
onBeforeUnmount(() => unlock());

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lock();
      emit('open');
    } else {
      unlock();
      emit('close');
    }
  }
);

const close = () => emit('update:modelValue', false);
const onOverlay = () => props.closeOnOverlay && close();
const onKey = (e: KeyboardEvent) =>
  props.closeOnEsc && e.key === 'Escape' && close();
</script>

<template>
  <Teleport to="body">
    <transition name="drawer-slide">
      <div v-if="modelValue" class="drawer" @keydown.esc="onKey">
        <div class="drawer__overlay" @click="onOverlay" />
        <aside
          class="drawer__panel"
          :class="[`drawer__panel--${side}`]"
          :style="{ width: typeof width === 'number' ? `${width}px` : width }"
        >
          <slot />
        </aside>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.drawer {
  position: fixed;
  inset: 0;
  z-index: 1000;
}
.drawer__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.drawer__panel {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #ffffff;
  padding: 1rem 1.25rem;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.drawer__panel--right {
  right: 0;
}
.drawer__panel--left {
  left: 0;
}

/* Slide animation */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.drawer-slide-enter-from .drawer__panel--right,
.drawer-slide-leave-to .drawer__panel--right {
  transform: translateX(100%);
}
.drawer-slide-enter-from .drawer__panel--left,
.drawer-slide-leave-to .drawer__panel--left {
  transform: translateX(-100%);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
}
</style>
