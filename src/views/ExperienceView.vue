<script setup>
import Console from '@/components/shared/Console.vue';
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { popup } from '@/assets/js/animations.js';
import { useMotion } from '@vueuse/motion';
import getJsonFile from '@/assets/js/locale_functions.js';
import TimeLine from '@/components/Experience/TimeLine.vue';
import FranciscoGonzalezCV from '@/assets/docs/resumeFranciscoJavierGonzalez.pdf';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const isConsolePoppedOut = ref(false);
const consoleContainer = ref(null);
const experienceData = ref(null);
const experienceTimeLine = ref(0);
const experienceType = ref('job_experience');

const loadSkills = async () => {
  experienceData.value = await getJsonFile(experienceType.value, locale.value);
};

const handleResize = () => {
  experienceTimeLine.value += 1;
};

const lines = [
  'experience = {',
  '    "Company A": "Role - Duration",',
  '    "Company B": "Role - Duration",',
  '    "Company C": "Role - Duration"',
  '}',
  'for company, details in experience.items():',
  '    print(f"{company}: {details}")',
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

const switchExperience = async (type) => {
  experienceType.value = type;
  await updateTimeLine();
};

const downloadCV = () => {
  const cvUrl = FranciscoGonzalezCV;
  window.open(cvUrl, '_blank');
};

watch(locale, async () => {
  await updateTimeLine();
});

const updateTimeLine = async () => {
  await loadSkills();
  experienceTimeLine.value += 1;
};

onMounted(async () => {
  if (consoleContainer.value) {
    ({ apply } = useMotion(consoleContainer.value, popup(1000)));
  }
  await loadSkills();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
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

  <main v-else class="h-100 w-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row mb-4">
        <div class="col text-center">
          <h1 class="mb-3 display-4 title">
            {{ experienceType === 'job_experience' ? t('experience_view.job') : t('experience_view.education') }}
          </h1>
          <div class="btn-group bg-dark p-3" role="group">
            <button class="btn btn_des" :class="{ active: experienceType === 'job_experience' }"
              @click="switchExperience('job_experience')">
              Work Experience
            </button>
            <button class="btn btn_des" :class="{ active: experienceType === 'education_experience' }"
              @click="switchExperience('education_experience')">
              Education
            </button>
            <button class="btn btn_des" @click="downloadCV">
              <i class="bi bi-download me-2"></i>Download CV
            </button>
          </div>
        </div>
      </div>

      <!-- Timeline Container -->
      <div class="row">
        <div class="col">
          <div class="timeline-wrapper" :key="experienceTimeLine">
            <TimeLine v-if="experienceData" :experience-data="experienceData" :experience-type="experienceType" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title {
  font-weight: bold;
  color: rgb(210, 220, 233);
}

.timeline-wrapper {
  max-height: 70vh;
  min-height: 300px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(74, 144, 226, 0.5) transparent;
}

.timeline-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.timeline-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.timeline-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(74, 144, 226, 0.5);
  border-radius: 20px;
}

.btn-group .btn {
  border-radius: 5px;
}

.btn_des {
  font-weight: bold;
  background: none;
  color: rgb(145, 145, 145);
  border: none;
}

.btn_des:hover {
  color: white;
}

.btn_des.active {
  color: #00ff00;
}
</style>