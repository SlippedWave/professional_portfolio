<script setup>
import Console from '@/components/shared/Console.vue';
import Icon from '@/components/shared/Icon.vue';
import ContactForm from '@/components/Contact/ContactForm.vue';
import { useConsoleIntro } from '@/composables/useConsoleIntro.js';
import { useI18n } from 'vue-i18n';
import linkedinIcon from '@/assets/icons/linkedin-icon.svg';
import githubIcon from '@/assets/icons/github-icon.svg';
import { getEmail, openMailClient } from '@/assets/js/protected_email.js';

const { t } = useI18n();

const { consoleContainer, isConsolePoppedOut, handleTypingCompleted } = useConsoleIntro();

// Decoded at runtime only; never stored as plain text in source or bundle
const email = getEmail();

const lines = [
  'contact_info = {',
  `    "Email": "${email}",`,
  '    "LinkedIn": "linkedin.com/in/frgonz",',
  '    "GitHub": "github.com/SlippedWave"',
  '}',
  'for method, info in contact_info.items():',
  '    print(f"{method}: {info}")',
];

const channels = [
  // mailto: is built on click so crawlers find no mailto link in the DOM
  { label: 'Email', value: email, href: '#', icon: 'mail', action: openMailClient },
  { label: 'LinkedIn', value: 'linkedin.com/in/frgonz', href: 'https://www.linkedin.com/in/frgonz', img: linkedinIcon },
  { label: 'GitHub', value: 'github.com/SlippedWave', href: 'https://github.com/SlippedWave', img: githubIcon, invert: true },
];
</script>

<template>
  <div v-if="!isConsolePoppedOut" class="flex flex-1 items-center justify-center">
    <div ref="consoleContainer">
      <Console :lines="lines" cwd="~/contact" fast @typing-completed="handleTypingCompleted" />
    </div>
  </div>

  <div v-else class="grid items-start gap-8 lg:grid-cols-[2fr_3fr]">
    <aside class="flex flex-col gap-6">
      <div>
        <p class="font-mono text-sm text-ink-muted">
          <span class="text-prompt">francisco@portfolio</span>:<span class="text-path">~/contact</span>$ ./say-hello.sh
        </p>
        <h1 class="section-title mt-2">{{ t('contact_form.title') }}</h1>
        <p class="mt-2 text-lg text-ink-muted">{{ t('contact_form.subtitle') }}</p>
      </div>

      <div class="panel p-5">
        <h2 class="text-sm font-medium tracking-widest text-ink-muted uppercase">{{ t('contact_view.direct') }}</h2>
        <ul class="mt-4 space-y-2">
          <li v-for="channel in channels" :key="channel.label">
            <a :href="channel.href" target="_blank" rel="noopener"
              class="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
              @click="channel.action && ($event.preventDefault(), channel.action())">
              <span class="grid size-10 place-items-center rounded-lg border border-edge text-accent">
                <Icon v-if="channel.icon" :name="channel.icon" :size="20" />
                <img v-else :src="channel.img" alt="" class="size-5" :class="{ invert: channel.invert }" />
              </span>
              <span class="flex flex-col">
                <span class="text-xs text-ink-muted">{{ channel.label }}</span>
                <span class="font-mono text-ink">{{ channel.value }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <ContactForm />
  </div>
</template>
