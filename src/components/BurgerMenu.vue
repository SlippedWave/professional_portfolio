<template>
    <div :class="['burger-icon', { 'open': isOpen }]" @click="toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['toggle']);
  
  const toggle = () => {
    emit('toggle');
  };
  </script>
  
  <style scoped>
  .burger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .burger-icon span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: all 0.3s ease;
  }
  
  .burger-icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .burger-icon.open span:nth-child(2) {
    opacity: 0;
  }
  
  .burger-icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -5px);
  }
</style>