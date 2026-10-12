<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Console from '@/components/shared/Console.vue';
import PresentationCard from '@/components/Home/PresentationCard.vue';
import IntroductionCard from '@/components/Home/IntroductionCard.vue';
import { useConsoleIntro } from '@/composables/useConsoleIntro.js';
import my_image from '@/assets/images/my_photo.jpg';

const { t } = useI18n();

const { consoleContainer, isConsolePoppedOut, handleTypingCompleted } = useConsoleIntro({ duration: 600 });

const lines = computed(() => [0, 1, 2].map(i => t(`home_view.greetingConsoleLines.${i}`)));

const cards = [
  { file: 'about.md', title: 'home_view.getToKnowMeTitle', text: 'home_view.getToKnowMeText' },
  { file: 'hobbies.md', title: 'home_view.hobbiesTitle', text: 'home_view.hobbiesText' },
  { file: 'interests.md', title: 'home_view.interestsTitle', text: 'home_view.interestsText' },
];
</script>

<template>
  <div v-if="!isConsolePoppedOut" class="flex flex-1 items-center justify-center">
    <div ref="consoleContainer">
      <Console :lines="lines" @typing-completed="handleTypingCompleted" />
    </div>
  </div>

  <div v-else class="flex flex-col gap-16 py-4 sm:py-10">
    <section id="presentation" v-motion-fade-visible-once>
      <PresentationCard :name="t('owners_info.name')" :title="t('owners_info.title')"
        :aboutme="t('home_view.aboutMeTitle')" :text="t('home_view.aboutMeText')" :imageref="my_image" />
    </section>

    <section id="about-me" class="grid gap-6 md:grid-cols-3">
      <div v-for="(card, index) in cards" :key="card.file" v-motion :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 500 } }">
        <IntroductionCard :file="card.file">
          <template #title>{{ t(card.title) }}</template>
          <template #text>{{ t(card.text) }}</template>
        </IntroductionCard>
      </div>
    </section>
  </div>
</template>
