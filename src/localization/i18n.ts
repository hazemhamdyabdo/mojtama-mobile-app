import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const supportedLanguages = ["en", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const LANGUAGE_STORAGE_KEY = "@mojtama/language";
const PENDING_HREF_STORAGE_KEY = "@mojtama/pending_href";
const RTL_APPLIED_FOR_KEY = "@mojtama/rtl_applied_for";

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

async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage ? resolveLanguage(storedLanguage) : null;
}

export async function getInitialLanguage(): Promise<SupportedLanguage> {
  const storedLanguage = await getStoredLanguage();
  return storedLanguage ?? getDeviceLanguage();
}

function syncRTLSettings(language: SupportedLanguage) {
  const isRTL = language === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}

function needsRTL(language: SupportedLanguage) {
  return language === "ar";
}

async function initI18nInstance(language: SupportedLanguage) {
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: fallbackLanguage,
      supportedLngs: [...supportedLanguages],
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: "v4",
    });
    return;
  }

  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }
}

export async function initializeI18n() {
  const language = await getInitialLanguage();
  const shouldBeRTL = needsRTL(language);
  syncRTLSettings(language);

  // Never reload in a loop: if RTL was already applied for this language,
  // continue even when Expo Go reports isRTL incorrectly after reload.
  if (I18nManager.isRTL !== shouldBeRTL) {
    const rtlAppliedFor = await AsyncStorage.getItem(RTL_APPLIED_FOR_KEY);

    if (rtlAppliedFor !== language) {
      await AsyncStorage.setItem(RTL_APPLIED_FOR_KEY, language);
      await Updates.reloadAsync();
      return;
    }
  }

  await initI18nInstance(language);
}

export async function consumePendingHref(): Promise<string | null> {
  const pendingHref = await AsyncStorage.getItem(PENDING_HREF_STORAGE_KEY);

  if (pendingHref) {
    await AsyncStorage.removeItem(PENDING_HREF_STORAGE_KEY);
  }

  return pendingHref;
}

export async function changeLanguage(
  language: SupportedLanguage,
  pendingHref?: string,
): Promise<boolean> {
  const currentLanguage = resolveLanguage(i18n.language);
  const currentShouldBeRTL = needsRTL(currentLanguage);
  const nextShouldBeRTL = needsRTL(language);
  const rtlDirectionChanged = currentShouldBeRTL !== nextShouldBeRTL;

  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  syncRTLSettings(language);
  await initI18nInstance(language);

  if (!rtlDirectionChanged) {
    return false;
  }

  await AsyncStorage.setItem(RTL_APPLIED_FOR_KEY, language);

  if (pendingHref) {
    await AsyncStorage.setItem(PENDING_HREF_STORAGE_KEY, pendingHref);
  }

  await Updates.reloadAsync();
  return true;
}

export default i18n;
