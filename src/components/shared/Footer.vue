<script setup>
import { useI18n } from 'vue-i18n';
import linkedinIcon from '@/assets/icons/linkedin-icon.svg';
import githubIcon from '@/assets/icons/github-icon.svg';

const { t } = useI18n();

const year = new Date().getFullYear();

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/frgonz', icon: linkedinIcon },
  { label: 'GitHub', href: 'https://github.com/SlippedWave', icon: githubIcon, invert: true },
];
</script>

<template>
  <footer class="hairline-t z-10 overflow-hidden bg-chrome/80 backdrop-blur-xl backdrop-saturate-150">
    <!-- Faint glow rising from the hairline -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgb(254_128_25/0.08),transparent_70%)]" aria-hidden="true"></div>
    <div
      class="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 text-center text-sm sm:px-6 md:flex-row md:justify-between md:text-left">
      <div>
        <p class="font-medium text-ink">{{ t('owners_info.name') }}</p>
        <p class="text-ink-muted">{{ t('owners_info.degree') }} · {{ t('owners_info.university') }}</p>
        <p class="text-ink-muted">{{ t('owners_info.location') }}</p>
      </div>

      <div class="flex flex-col items-center gap-2 md:items-end">
        <span class="text-ink-muted">{{ t('footer.findMe') }}</span>
        <div class="flex gap-2">
          <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank" rel="noopener"
            :aria-label="social.label"
            class="grid size-10 place-items-center rounded-lg border border-edge bg-white/[0.03] transition hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_16px] hover:shadow-accent/30">
            <img :src="social.icon" alt="" class="size-5" :class="{ invert: social.invert }" />
          </a>
        </div>
      </div>
    </div>
    <p class="border-t border-edge py-3 text-center font-mono text-xs text-ink-muted/70">
      {{ t('footer.rights', { year }) }}
    </p>
  </footer>
</template>
