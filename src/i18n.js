import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import common_en from "./locales/en.json";
import common_ar from "./locales/ar.json";
import backend from "i18next-http-backend";

// the translations
// (tip move them in a JSON file and import them)

const resources = {
  en: {
    translation: common_en,
  },
  ar: {
    translation: common_ar,
  },
};

i18n
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    // resources,
    // lng: document.querySelector("html").lang,
    // fallbackLng: "en",
    supportedLngs: ["ar", "en"],
    resources,
    // keySeparator: false, // we do not use keys in form messages.welcome
    // react: {
    // 	useSuspense: false
    // },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
