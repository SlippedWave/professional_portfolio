// filepath: /D:/Repos/professional_portfolio/professional_portfolio/src/views/SkillsView.vue
<script setup>
import Console from '@/components/Console.vue';

const lines = [
  'skills = ["Python", "JavaScript", "Vue.js", "Data Analysis", "Machine Learning"]',
  'for skill in skills:',
  '    print(f"Skill: {skill}")',
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