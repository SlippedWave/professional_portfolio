<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, onMounted, watch } from 'vue';
import SkillsMindMap from '@/components/Skills/SkillsMindMap.vue';
import getJsonFile from '@/assets/js/locale_functions.js';
import { useConsoleIntro } from '@/composables/useConsoleIntro.js';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const { consoleContainer, isConsolePoppedOut, handleTypingCompleted } = useConsoleIntro();

const mindMap = ref(0);
const skillsData = ref(null);

const lines = [
  'skills = ["Python", "Laravel", "SQL", "LLM agents", "Linux"]',
  'for skill in skills:',
  '    print(f"Skill: {skill}")',
];

const loadSkills = async () => {
  skillsData.value = await getJsonFile('skills', locale.value);
};

watch(locale, async () => {
  await loadSkills();
  mindMap.value += 1;
});

onMounted(loadSkills);
</script>

<template>
  <div v-if="!isConsolePoppedOut" class="flex flex-1 items-center justify-center">
    <div ref="consoleContainer">
      <Console :lines="lines" cwd="~/skills" fast @typing-completed="handleTypingCompleted" />
    </div>
  </div>

  <div v-else class="flex flex-1 flex-col gap-6">
    <header>
      <p class="font-mono text-sm text-ink-muted">
        <span class="text-prompt">francisco@portfolio</span>:<span class="text-path">~/skills</span>$ tree
      </p>
      <h1 class="section-title mt-2">{{ t('skills_view.title') }}</h1>
      <p class="mt-2 text-ink-muted">{{ t('skills_view.hint') }}</p>
    </header>

    <div class="panel h-[70vh] min-h-[420px] overflow-hidden" :key="mindMap">
      <SkillsMindMap v-if="skillsData" :skills-data="skillsData" />
    </div>
  </div>
</template>
