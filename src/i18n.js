import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import he from './locales/he/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he }
  },
  lng: 'he', // ברירת מחדל
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

// Function to update the direction
const updateDirection = (language) => {
  const dir = language === 'he' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
};

// Listen to language changes
i18n.on('languageChanged', (lng) => {
  updateDirection(lng);
});

// Set initial direction
updateDirection(i18n.language);

export default i18n
