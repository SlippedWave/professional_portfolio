// filepath: /D:/Repos/professional_portfolio/professional_portfolio/src/views/ProjectsView.vue
<script setup>
import Console from '@/components/Console.vue';

const lines = [
  'import pandas as pd',
  'projects = pd.DataFrame({',
  '    "Project": ["Project A", "Project B", "Project C"],',
  '    "Description": ["Description A", "Description B", "Description C"]',
  '})',
  'print(projects)',
];
</script>

<template>
  <main class="d-flex justify-content-center align-items-center h-100">
    <div class="row w-100">
      <div class="col-12 d-flex justify-content-center">
        <Console :lines="lines" />
      </div>
    </div>
  </main>
</template>