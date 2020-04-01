import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import locales from './static/locales';

const fallbackLng = ['en'];
const Languages = ['tr', 'en'];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: true,
    whitelist: Languages,
    interpolation: {
      escapeValue: false
    },
    ns: ['localizations'],
    defaultNS: 'localizations',
    resources: locales,
    react: {
      wait: true,
      useSuspense: false
    },
    keySeparator: '.'
  });

export default i18n;
