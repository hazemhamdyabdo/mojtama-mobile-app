import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DevSettings, I18nManager } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const supportedLanguages = ["en", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const LANGUAGE_STORAGE_KEY = "@mojtama/language";
const PENDING_HREF_STORAGE_KEY = "@mojtama/pending_href";
const RTL_RELOAD_GUARD_KEY = "@mojtama/rtl_reload_guard";

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
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage ? resolveLanguage(storedLanguage) : null;
  } catch {
    return null;
  }
}

export async function getInitialLanguage(): Promise<SupportedLanguage> {
  const storedLanguage = await getStoredLanguage();
  return storedLanguage ?? getDeviceLanguage();
}

export function isRTLLanguage(language: SupportedLanguage) {
  return language === "ar";
}

export function getActiveLanguage(): SupportedLanguage {
  return resolveLanguage(i18n.language);
}

/**
 * Persists the native layout direction. The new direction only takes effect
 * after the app reloads, so `I18nManager.isRTL` keeps reporting the old value
 * for the rest of this session.
 */
function applyDirectionPreference(language: SupportedLanguage) {
  const shouldBeRTL = isRTLLanguage(language);
  I18nManager.allowRTL(shouldBeRTL);
  I18nManager.forceRTL(shouldBeRTL);
}

/**
 * `Updates.reloadAsync` rejects in Expo Go and development builds, so fall back
 * to the dev-server reload there. Returns false when no reload could be run.
 */
async function reloadApp(): Promise<boolean> {
  if (__DEV__) {
    try {
      DevSettings.reload();
      return true;
    } catch {
      return false;
    }
  }

  try {
    await Updates.reloadAsync();
    return true;
  } catch {
    return false;
  }
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

  // Translations are applied first so text is always localized, even when the
  // runtime refuses to flip the native layout direction.
  await initI18nInstance(language);
  applyDirectionPreference(language);

  if (I18nManager.isRTL === isRTLLanguage(language)) {
    await AsyncStorage.removeItem(RTL_RELOAD_GUARD_KEY);
    return;
  }

  // Direction is stale and needs one reload. The guard stops a reload loop on
  // runtimes (such as Expo Go) that never apply the new direction.
  const guard = await AsyncStorage.getItem(RTL_RELOAD_GUARD_KEY);

  if (guard === language) {
    return;
  }

  await AsyncStorage.setItem(RTL_RELOAD_GUARD_KEY, language);

  if (!(await reloadApp())) {
    await AsyncStorage.removeItem(RTL_RELOAD_GUARD_KEY);
  }
}

export async function consumePendingHref(): Promise<string | null> {
  const pendingHref = await AsyncStorage.getItem(PENDING_HREF_STORAGE_KEY);

  if (pendingHref) {
    await AsyncStorage.removeItem(PENDING_HREF_STORAGE_KEY);
  }

  return pendingHref;
}

/**
 * Switches the app language. Returns true when a reload was triggered to apply
 * a new layout direction, in which case the caller should not keep navigating.
 */
export async function changeLanguage(
  language: SupportedLanguage,
  pendingHref?: string,
): Promise<boolean> {
  const directionChanged = I18nManager.isRTL !== isRTLLanguage(language);

  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  await initI18nInstance(language);
  applyDirectionPreference(language);

  if (!directionChanged) {
    await AsyncStorage.removeItem(RTL_RELOAD_GUARD_KEY);
    return false;
  }

  await AsyncStorage.setItem(RTL_RELOAD_GUARD_KEY, language);

  if (pendingHref) {
    await AsyncStorage.setItem(PENDING_HREF_STORAGE_KEY, pendingHref);
  }

  if (await reloadApp()) {
    return true;
  }

  await AsyncStorage.multiRemove([
    RTL_RELOAD_GUARD_KEY,
    PENDING_HREF_STORAGE_KEY,
  ]);

  return false;
}

export default i18n;
