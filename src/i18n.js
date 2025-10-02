// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
    .use(LanguageDetector) // 👈 añade detector de idioma
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        fallbackLng: 'en', // idioma de respaldo si no hay match
        detection: {
            order: ['localStorage', 'cookie', 'navigator'], // prioridad de detección
            caches: ['localStorage'], // guarda la preferencia en localStorage
        },
        interpolation: {
            escapeValue: false, // React ya protege contra XSS
        },
    });

export default i18n;
