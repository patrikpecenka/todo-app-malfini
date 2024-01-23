import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import translation_en from "./locales/en/translation.json";
import translation_cz from "./locales/cz/translation.json"


i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: translation_en
      },
      cz: {
        translation: translation_cz
      }
    },

    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"]
    },

    interpolation: {
      escapeValue: false
    },
  });

export default i18n;