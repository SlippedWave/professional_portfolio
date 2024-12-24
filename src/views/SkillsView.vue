<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted } from 'vue';
import { popup } from '@/assets/js/animations';
import { useMotion } from '@vueuse/motion';
import SkillsMindMap from '@/components/Skills/SkillsMindMap.vue';
import { useI18n } from 'vue-i18n';

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);

const { t } = useI18n();
const skills = t('skills');

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
    <div class="container mind-map-container">
      <SkillsMindMap :skills="skills" />
      <div class="blur-background"></div> <!-- Add this element for the blur effect -->
    </div>
  </main>
</template>

<style scoped>
.mind-map-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.329);
  filter: blur(5px);
  z-index: -1;
}
</style>