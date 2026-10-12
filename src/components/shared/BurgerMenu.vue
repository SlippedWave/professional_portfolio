<script setup>
import Icon from './Icon.vue';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle']);
</script>

<template>
  <button type="button" class="btn btn-ghost p-2" :aria-expanded="isOpen" aria-controls="navbarNav"
    aria-label="Toggle navigation" @click="emit('toggle')">
    <Icon :name="isOpen ? 'close' : 'menu'" :size="22" />
  </button>
</template>
