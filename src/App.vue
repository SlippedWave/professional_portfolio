<script setup>
import { computed } from 'vue';
import Navbar from './components/shared/Navbar.vue';
import Footer from './components/shared/Footer.vue';
import NavbarHud from './components/shared/NavbarHud.vue';
import FooterHud from './components/shared/FooterHud.vue';
import MatrixBackground from './components/shared/MatrixBackground.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const isErrorPage = computed(() => route.name === 'error');

// TEMP preview switch between header/footer designs: ?chrome=hud | ?chrome=refined (remembered per tab)
const chromeStyle = (() => {
  const fromQuery = new URLSearchParams(window.location.search).get('chrome');
  try {
    if (fromQuery) sessionStorage.setItem('chrome', fromQuery);
    return sessionStorage.getItem('chrome') ?? 'refined';
  } catch {
    return fromQuery ?? 'refined';
  }
})();
</script>

<template>
  <div class="relative flex min-h-dvh flex-col overflow-x-hidden">
    <MatrixBackground :letterColor="isErrorPage ? 'rgba(251, 73, 52, 0.3)' : 'rgba(254, 128, 25, 0.16)'" />

    <header class="sticky top-0 z-40">
      <NavbarHud v-if="chromeStyle === 'hud'" />
      <Navbar v-else />
    </header>

    <main class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16">
      <RouterView />
    </main>

    <FooterHud v-if="chromeStyle === 'hud'" />
    <Footer v-else />
  </div>
</template>
