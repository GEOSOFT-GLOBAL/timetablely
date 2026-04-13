import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import zh from "./locales/zh";

const stored = localStorage.getItem("app-language");
const lng = stored ? (JSON.parse(stored) as string) : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    zh: { translation: zh },
  },
  lng,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
