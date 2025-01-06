<template>
  <nav ref="navRef" class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top" @click.stop>
    <div class="container py-2">
      <RouterLink class="navbar-brand" to="/" @click="toggleMenu" exact-active-class="">
        <TypingAnimation :lines="lines" :writting_speed="100" :change_cursor_speed="500" />
      </RouterLink>

      <div class="d-lg-none">
        <BurgerMenu :isOpen="isMenuOpen" @toggle="toggleMenu" />
      </div>

      <!-- Close on link click -->
      <div ref="navbarCollapse" class="collapse navbar-collapse" :class="{ show: isMenuOpen }" id="navbarNav">
        <hr v-if="isMenuOpen" class="navbar-divider d-lg-none" />
        <ul class="navbar-nav ms-auto bg-dark rounded p-1 align-items-center text-nowrap">
          <li class="nav-item px-2">
            <LanguageSwitcher />
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="toggleMenu">
              {{ t('navbar.home') }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/projects" @click="toggleMenu">
              {{ t('navbar.projects') }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/skills" @click="toggleMenu">
              {{ t('navbar.skills') }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/experience" @click="toggleMenu">
              {{ t('navbar.experience') }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact" @click="toggleMenu">
              {{ t('navbar.contact') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import TypingAnimation from './TypingAnimation.vue'
import BurgerMenu from './BurgerMenu.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const lines = ['Francisco González']

const isMenuOpen = ref(false)
const navRef = ref(null)
const navbarCollapse = ref(null)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}



// Close menu if click is outside the menu
function handleClickOutside(event) {
  if (
    isMenuOpen.value &&
    navbarCollapse.value &&
    !navRef.value.contains(event.target)

  ) {
    toggleMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  width: 100%;
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