<!-- components/overlay/Modal.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    /** v-model open state */
    modelValue: boolean;
    /** sm | md | lg width presets */
    size?: 'sm' | 'md' | 'lg';
    /** click backdrop to close */
    closeOnOverlay?: boolean;
    /** hit Escape to close */
    closeOnEsc?: boolean;
    /** lock body scroll when open */
    scrollLock?: boolean;
    /** hide default X button */
    hideClose?: boolean;
  }>(),
  {
    size: 'md',
    closeOnOverlay: true,
    closeOnEsc: true,
    scrollLock: true,
    hideClose: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

/* ----------------------------------
 * Body scroll lock helpers
 * --------------------------------*/
const lockScroll = () => {
  if (props.scrollLock) document.body.style.overflow = 'hidden';
};
const unlockScroll = () => {
  if (props.scrollLock) document.body.style.overflow = '';
};

onMounted(() => {
  if (props.modelValue) lockScroll();
});

onBeforeUnmount(() => {
  unlockScroll();
});

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lockScroll();
      emit('open');
      // Focus modal for accessibility after next tick
      requestAnimationFrame(() => {
        (document.querySelector('.modal__dialog') as HTMLElement)?.focus();
      });
    } else {
      unlockScroll();
      emit('close');
    }
  },
  { immediate: false }
);

/* ----------------------------------
 * Event handlers
 * --------------------------------*/
const close = () => emit('update:modelValue', false);

const onOverlayClick = () => {
  if (props.closeOnOverlay) close();
};

const onKeydown = (evt: KeyboardEvent) => {
  if (props.closeOnEsc && evt.key === 'Escape') {
    close();
  }
};
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal" @keydown.esc="onKeydown">
        <div class="modal__overlay" @click="onOverlayClick" />
        <div
          class="modal__dialog"
          :class="[`modal__dialog--${size}`]"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <button
            v-if="!hideClose"
            class="modal__close"
            aria-label="Close modal"
            @click="close"
          >
            ×
          </button>

          <header v-if="$slots.header" class="modal__header">
            <slot name="header" />
          </header>

          <div class="modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal__dialog {
  position: relative;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.modal__dialog--sm {
  width: 20rem; /* 320px */
}
.modal__dialog--md {
  width: 32rem; /* 512px */
}
.modal__dialog--lg {
  width: 48rem; /* 768px */
}

.modal__header {
  padding: 1.25rem 1.5rem 0;
  font-weight: 600;
  font-size: 1.25rem;
}
.modal__body {
  padding: 1.25rem 1.5rem;
  flex: 1 1 auto;
}
.modal__footer {
  padding: 0 1.5rem 1.25rem;
}

.modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

/* Fade & scale animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
