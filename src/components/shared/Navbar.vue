<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import TypingAnimation from './TypingAnimation.vue'
import BurgerMenu from './BurgerMenu.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()

const lines = ['Francisco González']
const links = [
  { to: '/', key: 'navbar.home' },
  { to: '/projects', key: 'navbar.projects' },
  { to: '/skills', key: 'navbar.skills' },
  { to: '/experience', key: 'navbar.experience' },
  { to: '/contact', key: 'navbar.contact' },
]

const isMenuOpen = ref(false)
const navRef = ref(null)

// Close mobile menu on any navigation
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

function handleClickOutside(event) {
  if (isMenuOpen.value && !navRef.value.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav ref="navRef" class="hairline-b bg-chrome/75 backdrop-blur-xl backdrop-saturate-150">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <RouterLink to="/" class="flex items-center gap-2 font-mono text-lg text-ink">
        <span class="font-bold text-accent">$</span>
        <TypingAnimation :lines="lines" :speed="90" :lineDelay="400" />
      </RouterLink>

      <div class="lg:hidden">
        <BurgerMenu :isOpen="isMenuOpen" @toggle="isMenuOpen = !isMenuOpen" />
      </div>

      <div id="navbarNav"
        class="absolute inset-x-0 top-full border-b border-edge bg-chrome px-4 pb-4 shadow-2xl shadow-black/60 lg:static lg:flex lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
        :class="isMenuOpen ? 'block' : 'hidden'">
        <ul class="flex flex-col gap-1 py-2 font-mono lg:flex-row lg:py-0">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to"
              class="block rounded-md px-3 py-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              exact-active-class="!text-accent bg-accent/10">
              {{ t(link.key) }}
            </RouterLink>
          </li>
        </ul>
        <div class="mt-2 lg:mt-0">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
