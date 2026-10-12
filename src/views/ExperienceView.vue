<script setup>
import Console from '@/components/shared/Console.vue';
import Icon from '@/components/shared/Icon.vue';
import { ref, onMounted, watch } from 'vue';
import getJsonFile from '@/assets/js/locale_functions.js';
import TimeLine from '@/components/Experience/TimeLine.vue';
import FranciscoGonzalezCV from '@/assets/docs/resumeFranciscoJavierGonzalez.pdf';
import { useConsoleIntro } from '@/composables/useConsoleIntro.js';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const { consoleContainer, isConsolePoppedOut, handleTypingCompleted } = useConsoleIntro();

const experienceData = ref(null);
const experienceType = ref('job_experience');

const tabs = [
  { type: 'job_experience', key: 'experience_view.tabs.job' },
  { type: 'education_experience', key: 'experience_view.tabs.education' },
];

const loadExperience = async () => {
  experienceData.value = await getJsonFile(experienceType.value, locale.value);
};

const lines = [
  'experience = {',
  '    "Intel": "AI Engineering Intern",',
  '    "ELI Schools": "Software Developer",',
  '    "HPT": "Full Stack Developer",',
  '    "ITEKNIA": "Software Developer"',
  '}',
  'for company, details in experience.items():',
  '    print(f"{company}: {details}")',
];

const switchExperience = async (type) => {
  experienceType.value = type;
  await loadExperience();
};

watch(locale, loadExperience);

onMounted(loadExperience);
</script>

<template>
  <div v-if="!isConsolePoppedOut" class="flex flex-1 items-center justify-center">
    <div ref="consoleContainer">
      <Console :lines="lines" cwd="~/experience" fast @typing-completed="handleTypingCompleted" />
    </div>
  </div>

  <div v-else class="flex flex-col gap-8">
    <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="font-mono text-sm text-ink-muted">
          <span class="text-prompt">francisco@portfolio</span>:<span class="text-path">~/experience</span>$ cat
          history.log
        </p>
        <h1 class="section-title mt-2">
          {{ experienceType === 'job_experience' ? t('experience_view.job') : t('experience_view.education') }}
        </h1>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="flex rounded-lg border border-edge bg-black/20 p-1" role="tablist">
          <button v-for="tab in tabs" :key="tab.type" type="button" role="tab"
            :aria-selected="experienceType === tab.type"
            class="cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors"
            :class="experienceType === tab.type ? 'bg-accent font-bold text-canvas' : 'text-ink-muted hover:text-ink'"
            @click="switchExperience(tab.type)">
            {{ t(tab.key) }}
          </button>
        </div>
        <a :href="FranciscoGonzalezCV" target="_blank" rel="noopener" class="btn btn-outline">
          <Icon name="download" :size="16" />
          {{ t('common.download_cv') }}
        </a>
      </div>
    </header>

    <TimeLine v-if="experienceData" :key="experienceType + locale" :experience-data="experienceData" />
  </div>
</template>
