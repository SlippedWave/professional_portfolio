<script setup>
import Console from '@/components/Console.vue';

const lines = [
  'print("404 Not Found")',
  'print("The page you are looking for does not exist.")',
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