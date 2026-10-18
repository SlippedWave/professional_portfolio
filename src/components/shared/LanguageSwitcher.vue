<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ukFlag from '@/assets/icons/uk-flag.svg';
import mexicanFlag from '@/assets/icons/mexican-flag.svg';
import germanFlag from '@/assets/icons/german-flag.svg';

const { locale, availableLocales } = useI18n();

const languages = [
  { code: 'en', label: 'English', flag: ukFlag },
  { code: 'es', label: 'Español', flag: mexicanFlag },
  { code: 'de', label: 'Deutsch', flag: germanFlag },
];

const setLanguage = (lang) => {
  locale.value = lang;
  document.documentElement.lang = lang;
  try {
    localStorage.setItem('locale', lang);
  } catch {
    // Storage unavailable (private mode); choice just won't persist
  }
};

onMounted(() => {
  let saved = null;
  try {
    saved = localStorage.getItem('locale');
  } catch {
    // ignore
  }
  if (saved && availableLocales.includes(saved)) {
    setLanguage(saved);
  }
});
</script>

<template>
  <div class="inline-flex items-center gap-1 rounded-full border border-edge bg-black/20 p-1" role="group"
    aria-label="Language">
    <button v-for="lang in languages" :key="lang.code" type="button"
      class="cursor-pointer rounded-full p-0.5 transition hover:scale-110"
      :class="locale === lang.code ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'"
      :aria-pressed="locale === lang.code" :title="lang.label" @click="setLanguage(lang.code)">
      <img :src="lang.flag" :alt="lang.label" class="size-6 rounded-full object-cover" />
    </button>
  </div>
</template>
