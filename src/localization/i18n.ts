import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const supportedLanguages = ["en", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

const fallbackLanguage: SupportedLanguage = "en";

export function resolveLanguage(
  languageCode: string | null | undefined,
): SupportedLanguage {
  if (languageCode === "ar" || languageCode === "en") {
    return languageCode;
  }

  return fallbackLanguage;
}

export function getDeviceLanguage(): SupportedLanguage {
  return resolveLanguage(getLocales()[0]?.languageCode);
}

function applyRTL(language: SupportedLanguage) {
  const isRTL = language === "ar";

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }
}

const initialLanguage = getDeviceLanguage();
applyRTL(initialLanguage);

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  supportedLngs: [...supportedLanguages],
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export async function changeLanguage(language: SupportedLanguage) {
  applyRTL(language);
  await i18n.changeLanguage(language);
}

export default i18n;
