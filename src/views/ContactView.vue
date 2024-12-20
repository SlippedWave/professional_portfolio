// filepath: /D:/Repos/professional_portfolio/professional_portfolio/src/views/ContactView.vue
<script setup>
import Console from '@/components/Console.vue';

const lines = [
  'contact_info = {',
  '    "Email": "frgonz03@gmail.com",',
  '    "LinkedIn": "linkedin.com/in/franglz",',
  '    "GitHub": "github.com/SlippedWave"',
  '}',
  'for method, info in contact_info.items():',
  '    print(f"{method}: {info}")',
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