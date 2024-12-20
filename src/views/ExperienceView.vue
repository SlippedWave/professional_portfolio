// filepath: /D:/Repos/professional_portfolio/professional_portfolio/src/views/ExperienceView.vue
<script setup>
import Console from '@/components/Console.vue';


const lines = [
  'experience = {',
  '    "Company A": "Role - Duration",',
  '    "Company B": "Role - Duration",',
  '    "Company C": "Role - Duration"',
  '}',
  'for company, details in experience.items():',
  '    print(f"{company}: {details}")',
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