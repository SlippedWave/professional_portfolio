import { createI18n } from 'vue-i18n';
import en from './assets/locales/en.json';
import es from './assets/locales/es.json';
import de from './assets/locales/de.json';

const messages = {
  en,
  es,
  de
};

const i18n = createI18n({
  locale: 'en',
  messages,
});

export default i18n;