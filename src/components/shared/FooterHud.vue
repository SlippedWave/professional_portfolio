<script setup>
import { useI18n } from 'vue-i18n';

// tmux status line footer: session segment, info, link "windows", right-hand status segments
const { t, locale } = useI18n();

const year = new Date().getFullYear();

const socials = [
  { label: 'gh', value: 'SlippedWave', href: 'https://github.com/SlippedWave' },
  { label: 'in', value: 'frgonz', href: 'https://www.linkedin.com/in/frgonz' },
  { label: 'fiverr', value: 'frgonz', href: 'https://www.fiverr.com/frgonz' },
];
</script>

<template>
  <footer class="hairline-t relative z-10 bg-chrome/85 font-mono text-xs backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-col gap-1">
        <p class="text-sm text-ink">{{ t('owners_info.name') }}</p>
        <p class="text-ink-muted">
          <span class="text-prompt">#</span> {{ t('owners_info.degree') }} · {{ t('owners_info.university') }} · {{
            t('owners_info.location') }}
        </p>
      </div>
      <ul class="flex flex-wrap gap-x-4 gap-y-1">
        <li v-for="social in socials" :key="social.label">
          <a :href="social.href" target="_blank" rel="noopener"
            class="text-ink-muted transition-colors hover:text-accent">
            <span class="text-path">{{ social.label }}:</span>{{ social.value }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Status line -->
    <div class="flex h-7 items-stretch justify-between bg-black/30">
      <div class="flex items-stretch">
        <span class="seg bg-accent font-bold text-canvas">[portfolio]</span>
        <span class="seg bg-raised text-ink">main</span>
      </div>
      <div class="flex items-stretch text-ink-muted">
        <span class="hidden items-center px-3 sm:flex">utf-8</span>
        <span class="flex items-center px-3 uppercase">{{ locale }}</span>
        <span class="flex items-center bg-panel-2 px-3 text-ink">
          <span class="sm:hidden">© {{ year }}</span>
          <span class="hidden sm:inline">{{ t('footer.rights', { year }) }}</span>
        </span>
      </div>
    </div>
  </footer>
</template>
