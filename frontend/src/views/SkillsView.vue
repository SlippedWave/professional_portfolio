<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted, watch } from 'vue';
import { popup } from '@/assets/js/animations.js';
import { useMotion } from '@vueuse/motion';
import SkillsMindMap from '@/components/Skills/SkillsMindMap.vue';
import getJsonFile from '@/assets/js/locale_functions.js';

import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);
const mindMap = ref(0);
const skillsData = ref(null);

const lines = [
  'skills = ["Python", "JavaScript", "Vue.js", "Data Analysis", "Machine Learning"]',
  'for skill in skills:',
  '    print(f"Skill: {skill}")',
];

let apply;

const handleTypingCompleted = async () => {
  if (consoleContainer.value) {
    await apply('leave');
  }
  isConsolePoppedOut.value = true;
  await nextTick();
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    observer.observe(section);
  });
};

const loadSkills = async () => {
  skillsData.value = await getJsonFile('skills', locale.value);
};

watch(locale, async () => {
  await loadSkills();
  mindMap.value += 1;
});

onMounted(async () => {
  if (consoleContainer.value) {
    ({ apply } = useMotion(consoleContainer.value, popup(1000)));
  }
  await loadSkills();
});

</script>

<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div ref="consoleContainer">
      <div class="d-flex justify-content-center align-items-center">
        <Console :lines="lines" @typing-completed="handleTypingCompleted" />
      </div>
    </div>
  </main>

  <main v-else class="skills-view h-100 w-100">
    <div class="mindmap-container" :key="mindMap">
      <SkillsMindMap v-if="skillsData" :skills-data="skillsData" />
    </div>
  </main>
</template>

<style scoped>
.skills-view {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.mindmap-container {
  width: 90%;
  height: 90vh;
  border-radius: 8px;
  overflow: auto;
}
</style>