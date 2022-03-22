import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import English from './en.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: English
    }
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
})

export default i18n
