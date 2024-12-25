<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted, watch } from 'vue';
import { popup } from '@/assets/js/animations';
import { useMotion } from '@vueuse/motion';
import SkillsMindMap from '@/components/Skills/SkillsMindMap.vue';

import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);
const mindMap = ref(0);

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

onMounted(() => {
  if (consoleContainer.value) {
    ({ apply } = useMotion(consoleContainer.value, popup(1000)));
  }
});

watch(locale, () => {
  mindMap.value += 1;
});

</script>

<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div ref="consoleContainer">
      <div class="console-container d-flex justify-content-center align-items-center">
        <Console :lines="lines" @typing-completed="handleTypingCompleted" />
      </div>
    </div>
  </main>

  <main v-else class="h-100 d-flex justify-content-center align-items-center">
    <div class="container mind-map-container" :key="mindMap">
      <SkillsMindMap />
    </div>
  </main>
</template>

<style scoped></style>