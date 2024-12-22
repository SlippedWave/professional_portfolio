<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import TypingAnimation from './TypingAnimation.vue';
import BurgerMenu from './BurgerMenu.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { t } = useI18n();

const lines = ['Francisco González'];
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container py-2">
      <RouterLink class="navbar-brand" to="/" exact-active-class="">
        <TypingAnimation :lines="lines" :writting_speed="100" :change_cursor_speed="500" />
      </RouterLink>

      <div class="d-lg-none">
        <BurgerMenu :isOpen="isMenuOpen" @toggle="toggleMenu" />
      </div>

      <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarNav">
        <hr v-if="isMenuOpen" class="navbar-divider d-lg-none" />
        <ul class="navbar-nav ms-auto bg-dark rounded p-1 align-items-center text-nowrap">
          <li class="nav-item px-2">
            <LanguageSwitcher />
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" exact-active-class="router-link-exact-active">{{
              t('navbar.home') }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/projects" exact-active-class="router-link-exact-active">{{
              t('navbar.projects') }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/skills" exact-active-class="router-link-exact-active">{{
              t('navbar.skills') }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/experience" exact-active-class="router-link-exact-active">{{
              t('navbar.experience') }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact" exact-active-class="router-link-exact-active">{{
              t('navbar.contact') }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-nav {
  max-width: 800px;
  overflow-x: auto;

}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-size: 1.25rem;
}

.nav-link:hover {
  color: #ffffff !important;
}

.router-link-exact-active {
  font-weight: bold;
  color: #00ff00 !important;
}

.navbar-divider {
  border-color: rgb(255, 255, 255);
  margin: 0.75rem 0;
}
</style>
