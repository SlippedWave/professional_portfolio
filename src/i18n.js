import { createI18n } from 'vue-i18n';
import en from '../public/locales/en.json';
import es from '../public/locales/es.json';
import de from '../public/locales/de.json';

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