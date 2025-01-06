<script setup>
import { computed } from 'vue';
import Navbar from './components/shared/Navbar.vue';
import Footer from './components/shared/Footer.vue';
import MatrixBackground from './components/shared/MatrixBackground.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const isErrorPage = computed(() => route.name === 'error');
</script>

<template>
  <div class="app-wrapper vh-100 d-flex flex-column">
    <MatrixBackground :letterColor="isErrorPage ? 'rgba(255, 0, 0, 0.4)' : 'rgba(42, 24, 110, 0.4)'" />

    <header class="sticky-top">
      <Navbar />
    </header>

    <main class="flex-grow-1">
      <div class="container h-100">
        <RouterView />
      </div>
    </main>

    <footer class="fixed-bottom">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

main {
  padding-bottom: 3rem;
  padding-top: 1rem
}

header {
  z-index: 1030;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
}

main {
  z-index: 1;
  position: relative;
}

footer {
  z-index: 2;
}
</style>