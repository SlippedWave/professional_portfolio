<script setup>
import { ref, nextTick, onUnmounted, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMotion } from '@vueuse/motion';
import Console from '@/components/shared/Console.vue';
import PresentationCard from '@/components/Home/PresentationCard.vue';
import IntroductionCard from '@/components/Home/IntroductionCard.vue';
import { popup } from '@/assets/js/animations.js';

const { t } = useI18n();

const currentSection = ref('');
const consoleContainer = ref(null);
const isConsolePoppedOut = ref(false);

const lines = [];
let apply;

for (let i = 0; i < 3; i++) {
  lines.push(t(`home_view.greetingConsoleLines.${i}`));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentSection.value = entry.target.getAttribute('id');
        entry.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  },
  { threshold: 0.1 }
);

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

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
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

  <!-- Intro Section -->
  <main v-else class="d-flex justify-content-center align-items-center">
    <div class="container-fluid">
      <div class="row flex-column">
        <!-- Card 1 -->
        <div class="mini-page">
          <section id="presentation">
            <div v-motion-roll-visible-bottom>
              <PresentationCard :name="t('owners_info.name')" :title="t('owners_info.title')"
                :aboutme="t('home_view.aboutMeTitle')" :text="t('home_view.aboutMeText')"
                imageref="../../assets/images/my_photo.jpg" />
            </div>
          </section>
        </div>

        <!-- Card 2 -->
        <div class="mini-page">
          <section id="about-me">
            <div v-motion-roll-visible-bottom>
              <IntroductionCard>
                <template #title>{{ t('home_view.aboutMeTitle') }}</template>
                <template #text>{{ t('home_view.aboutMeText') }}</template>
              </IntroductionCard>
            </div>
          </section>
        </div>

        <!-- Card 3 -->
        <div class="mini-page">
          <section id="hobbies">
            <div v-motion-slide-visible-left>
              <IntroductionCard>
                <template #title>{{ t('home_view.hobbiesTitle') }}</template>
                <template #text>{{ t('home_view.hobbiesText') }}</template>
              </IntroductionCard>
            </div>
          </section>
        </div>

        <!-- Card 4 -->
        <div class="mini-page">
          <section id="interests">
            <div v-motion-slide-visible-right>
              <IntroductionCard>
                <template #title>{{ t('home_view.interestsTitle') }}</template>
                <template #text>{{ t('home_view.interestsText') }}</template>
              </IntroductionCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.mini-page {
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 100vh;
}

section {
  padding: 20%;
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
