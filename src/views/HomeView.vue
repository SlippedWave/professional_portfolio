<script setup>
import { ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useIntersectionObserver } from '@vueuse/core';
import Console from '@/components/Console.vue';
import PresentationCard from '@/components/PresentationCard.vue';
import IntroductionCard from '@/components/IntroductionCard.vue';

const { t } = useI18n();

const headers = [
  'presentation',
  'about-me',
  'hobbies',
  'interests',
]

const currentSection = ref('');

const lines = [];
for (let i = 0; i < 3; i++) {
  lines.push(t(`consoleLines.${i}`));
}

const isConsolePoppedOut = ref(false);
const handleTypingCompleted = async () => {
  isConsolePoppedOut.value = true;

  await nextTick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentSection.value = entry.target.getAttribute('id');
          console.log('Current Section:', currentSection.value);
        }
      });
    },
    { threshold: 0.5 }
  );

  const sections = document.querySelectorAll('section');
  console.log('Sections:', sections);

  sections.forEach((section) => {
    observer.observe(section);
  });
};
</script>

<template>
  <main v-if="!isConsolePoppedOut" class="h-100 d-flex justify-content-center align-items-center">
    <div class="console-container d-flex justify-content-center align-items-center">
      <Console :lines="lines" @typing-completed="handleTypingCompleted" />
    </div>
  </main>

  <main class="d-flex justify-content-center align-items-center">

    <!-- Intro Section -->
    <div v-if="isConsolePoppedOut" class="intro-section">
      <div class="container-fluid">
        <div class="row flex-column">
          <!-- Card 1 -->
          <section id="presentation">
            <div v-motion-roll-visible-bottom>
              <PresentationCard :name="t('name')" :title="t('title')" :aboutme="t('aboutMeTitle')"
                :text="t('aboutMeText')" imageref="../assets/images/my_photo.jpg" />
            </div>
          </section>

          <!-- Card 2 -->
          <section id="about-me">
            <div v-motion-roll-visible-bottom>
              <IntroductionCard>
                <template #title>{{ t('aboutMeTitle') }}</template>
                <template #text>{{ t('aboutMeText') }}</template>
              </IntroductionCard>>
            </div>
          </section>

          <!-- Card 3 -->
          <section id="hobbies">
            <div v-motion-slide-visible-left>
              <IntroductionCard>
                <template #title>{{ t('hobbiesTitle') }}</template>
                <template #text>{{ t('hobbiesText') }}</template>
              </IntroductionCard>
            </div>
          </section>

          <!-- Card 4 -->
          <section id="interests">
            <div v-motion-slide-visible-right>
              <IntroductionCard>
                <template #title>{{ t('interestsTitle') }}</template>
                <template #text>{{ t('interestsText') }}</template>
              </IntroductionCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
section {
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 100vh;
}

.flex-column {
  flex-direction: column;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.console-container {
  width: 100%;

}

.intro-section {
  width: 100%;
  max-width: 1000px;
  overflow-y: auto;
  height: 100vh;
  position: relative;
}

.intro-section .row {
  flex-direction: column;
}

.col-12 {
  width: 100%;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
