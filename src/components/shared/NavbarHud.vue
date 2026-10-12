<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import BurgerMenu from './BurgerMenu.vue'

// tmux / powerline style header: session segment, cwd segment, numbered window list, clock
const { t, locale, availableLocales } = useI18n()
const languages = ['en', 'es', 'de']
const route = useRoute()

const links = [
  { to: '/', key: 'navbar.home' },
  { to: '/projects', key: 'navbar.projects' },
  { to: '/skills', key: 'navbar.skills' },
  { to: '/experience', key: 'navbar.experience' },
  { to: '/contact', key: 'navbar.contact' },
]

const cwd = computed(() => (route.path === '/' ? '~' : `~${route.path}`))

const time = ref('')
const updateTime = () => {
  time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}
let clock = null

const isMenuOpen = ref(false)
const navRef = ref(null)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

const setLanguage = (lang) => {
  locale.value = lang
  document.documentElement.lang = lang
  try {
    localStorage.setItem('locale', lang)
  } catch {
    // Storage unavailable; choice just won't persist
  }
}

function handleClickOutside(event) {
  if (isMenuOpen.value && !navRef.value.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  updateTime()
  clock = setInterval(updateTime, 15000)
  document.addEventListener('click', handleClickOutside)
  try {
    const saved = localStorage.getItem('locale')
    if (saved && availableLocales.includes(saved)) setLanguage(saved)
  } catch {
    // ignore
  }
})

onUnmounted(() => {
  clearInterval(clock)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav ref="navRef" class="hairline-b relative bg-chrome/85 font-mono text-sm backdrop-blur-xl">
    <div class="mx-auto flex h-11 max-w-6xl items-stretch justify-between px-0 sm:px-6">
      <!-- Left: session + cwd segments -->
      <RouterLink to="/" class="flex items-stretch">
        <span class="seg gap-2 bg-accent font-bold text-canvas">
          <span class="size-2 animate-pulse rounded-full bg-canvas"></span>francisco
        </span>
        <span class="seg bg-raised text-ink">{{ cwd }}</span>
      </RouterLink>

      <!-- Center: tmux window list -->
      <div id="navbarNav"
        class="absolute inset-x-0 top-full border-b border-edge bg-chrome shadow-2xl shadow-black/60 lg:static lg:flex lg:items-stretch lg:border-0 lg:bg-transparent lg:shadow-none"
        :class="isMenuOpen ? 'block' : 'hidden'">
        <ul class="flex flex-col py-2 lg:flex-row lg:items-stretch lg:py-0">
          <li v-for="(link, index) in links" :key="link.to" class="flex">
            <RouterLink :to="link.to" v-slot="{ isExactActive, navigate, href }" custom>
              <a :href="href" @click="navigate"
                class="flex w-full items-center gap-1 px-4 py-2 transition-colors lg:px-3 lg:py-0"
                :class="isExactActive ? 'bg-panel-2 text-accent' : 'text-ink-muted hover:bg-white/5 hover:text-ink'">
                <span class="text-ink-muted/60">{{ index }}:</span>{{ t(link.key).replace('/', '') }}<span
                  class="w-2 text-accent">{{ isExactActive ? '*' : '' }}</span>
              </a>
            </RouterLink>
          </li>
        </ul>
        <!-- Language as plain codes on mobile -->
        <div class="flex gap-1 px-4 pb-3 lg:hidden">
          <button v-for="code in languages" :key="code" type="button"
            class="cursor-pointer rounded px-2 py-1 uppercase"
            :class="locale === code ? 'bg-accent font-bold text-canvas' : 'text-ink-muted hover:text-ink'"
            @click="setLanguage(code)">{{ code }}</button>
        </div>
      </div>

      <!-- Right: language + clock segments (desktop), burger (mobile) -->
      <div class="flex items-stretch">
        <div class="hidden items-center gap-0.5 px-3 lg:flex">
          <button v-for="code in languages" :key="code" type="button"
            class="cursor-pointer rounded px-1.5 py-0.5 text-xs uppercase transition-colors"
            :class="locale === code ? 'bg-accent/20 text-accent' : 'text-ink-muted hover:text-ink'"
            :aria-pressed="locale === code" @click="setLanguage(code)">{{ code }}</button>
        </div>
        <span class="hidden items-center bg-panel-2 px-3 text-ink sm:flex">{{ time }}</span>
        <div class="flex items-center px-2 lg:hidden">
          <BurgerMenu :isOpen="isMenuOpen" @toggle="isMenuOpen = !isMenuOpen" />
        </div>
      </div>
    </div>
  </nav>
</template>
