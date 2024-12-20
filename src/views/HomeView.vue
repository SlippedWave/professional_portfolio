<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useIntersectionObserver } from '@vueuse/core';
import Console from '@/components/Console.vue';
import PresentationCard from '@/components/PresentationCard.vue';
import IntroductionCard from '@/components/IntroductionCard.vue';

const { t } = useI18n();

const lines = [];
for (let i = 0; i < 3; i++) {
  lines.push(t(`consoleLines.${i}`));
}

const isConsolePoppedOut = ref(false);
const handleTypingCompleted = () => {
  isConsolePoppedOut.value = true;
};

const sections = ref([]);
const activeSectionIndex = ref(0);

const registerSections = (el) => {
  if (el && !sections.value.includes(el)) {
    sections.value.push(el);
  }
};

const scrollToNextSection = () => {
  if (activeSectionIndex.value < sections.value.length - 1) {
    activeSectionIndex.value += 1;
    sections.value[activeSectionIndex.value].scrollIntoView({ behavior: 'smooth' });
  }
};

sections.value.forEach((section, index) => {
  useIntersectionObserver(section, ([entry]) => {
    if (entry.isIntersecting) {
      activeSectionIndex.value = index;
    }
  });
});
</script>

<template>
  <main class="h-100 d-flex justify-content-center align-items-center">
    <div v-if="!isConsolePoppedOut" class="console-container d-flex justify-content-center align-items-center">
      <Console :lines="lines" @typing-completed="handleTypingCompleted" />
    </div>

    <!-- Intro Section -->
    <div v-if="isConsolePoppedOut" class="intro-section">
      <div class="container-fluid">
        <div class="row flex-column">
          <!-- Card 1 -->
          <section ref="registerSections">
            <div v-motion-roll-visible-bottom>
              <PresentationCard :name="t('name')" :title="t('title')" :aboutme="t('aboutMeTitle')"
                :text="t('aboutMeText')" imageref="../assets/images/my_photo.jpg" />
            </div>
          </section>

          <!-- Card 2 -->
          <section ref="registerSections">
            <div v-motion-roll-visible-bottom>
              <IntroductionCard :title="t('aboutMeTitle')" :text="t('aboutMeText')" />
            </div>
          </section>

          <!-- Card 3 -->
          <section ref="registerSections">
            <div v-motion-slide-visible-left>
              <IntroductionCard :title="t('hobbiesTitle')" :text="t('hobbiesText')" />
            </div>
          </section>

          <!-- Card 4 -->
          <section ref="registerSections">
            <div v-motion-slide-visible-right>
              <IntroductionCard :title="t('interestsTitle')" :text="t('interestsText')" />
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
  position: absolute;
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
