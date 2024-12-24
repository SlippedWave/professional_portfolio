import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

const messages = {
  en: en,
  es: es,
  de: de
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

export default i18n;