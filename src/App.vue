<script setup>
import { computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import MatrixBackground from './components/MatrixBackground.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const isErrorPage = computed(() => route.name === 'not-found' || route.name === 'server-error');
</script>

<template>
  <div class="vh-100 d-flex flex-column">
    <MatrixBackground :letterColor="isErrorPage ? 'rgba(255, 0, 0, 0.4)' : 'rgba(42, 24, 110, 0.4)'" />
    <header>
      <Navbar />
    </header>
    <main class="flex-grow-1 d-flex justify-content-center align-items-center">
      <div class="container h-100">

        <RouterView />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
header {
  z-index: 2;
}

main {
  z-index: 1;
}
</style>