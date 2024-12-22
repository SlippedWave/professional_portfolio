// filepath: /d:/Repos/professional_portfolio/professional_portfolio/src/components/MindMap.vue
<template>
    <vue-flow :elements="elements" style="width: 100%; height: 100vh;" />
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';

const elements = ref([
    { id: '1', type: 'input', data: { label: 'Skills' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Python' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'JavaScript' }, position: { x: 400, y: 100 } },
    { id: '4', data: { label: 'Vue.js' }, position: { x: 250, y: 200 } },
    { id: '5', data: { label: 'Data Analysis' }, position: { x: 100, y: 300 } },
    { id: '6', data: { label: 'Machine Learning' }, position: { x: 400, y: 300 } },
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
    { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
    { id: 'e1-5', source: '1', target: '5', type: 'smoothstep' },
    { id: 'e1-6', source: '1', target: '6', type: 'smoothstep' },
]);
</script>

<style scoped></style>