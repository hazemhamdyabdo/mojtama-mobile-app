import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import LanguageOptionCard from "@/features/auth/components/LanguageOptionCard";
import {
  changeLanguage,
  getActiveLanguage,
  type SupportedLanguage,
} from "@/localization/i18n";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";

const languageOptions = [
  {
    code: "en" as const,
    titleKey: "auth.languageChoice.english",
    subtitleKey: "auth.languageChoice.englishSubtitle",
    flag: require("@/assets/images/auth/circle-flags_lang-en-us.png"),
  },
  {
    code: "ar" as const,
    titleKey: "auth.languageChoice.arabic",
    subtitleKey: "auth.languageChoice.arabicSubtitle",
    flag: require("@/assets/images/auth/circle-flags_sa.png"),
  },
];

export default function LanguageChoice() {
  const router = useRouter();
  const { t } = useTranslation();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(getActiveLanguage);
  const [isApplying, setIsApplying] = useState(false);

  const goToLogin = () => {
    router.push({
      pathname: "/login",
      params: {
        language: selectedLanguage,
        ...(role ? { role } : {}),
      },
    });
  };

  const handleContinue = async () => {
    if (isApplying) {
      return;
    }

    setIsApplying(true);

    const params = new URLSearchParams({ language: selectedLanguage });
    if (role) {
      params.set("role", role);
    }

    try {
      const didReload = await changeLanguage(
        selectedLanguage,
        `/login?${params.toString()}`,
      );

      // A reload replaces this screen, so only navigate when it did not happen.
      if (!didReload) {
        goToLogin();
      }
    } catch (error) {
      console.warn("Failed to change language", error);
      goToLogin();
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <ScreenSafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.white,
        height: "100%",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/auth/onboarding-waves.png")}
        resizeMode="cover"
        className="flex-1 px-6 justify-center gap-20"
        style={{ flex: 1 }}
      >
        <View className=" items-center justify-center ">
          <Image
            source={require("@/assets/images/auth/logo-text.png")}
            resizeMode="contain"
            className=" w-full"
          />
        </View>
        <View className=" items-center justify-center px-4">
          <View className="w-full gap-6">
            <View className="w-full gap-1">
              <Text className="text-2xl font-semibold">
                {t("auth.languageChoice.title")}
              </Text>
              <Text className="text-sm text-sec-text">
                {t("auth.languageChoice.subtitle")}
              </Text>
            </View>
            <View className="w-full flex-col gap-4">
              {languageOptions.map((option) => (
                <LanguageOptionCard
                  key={option.code}
                  title={t(option.titleKey)}
                  subtitle={t(option.subtitleKey)}
                  flagSource={option.flag}
                  selected={selectedLanguage === option.code}
                  onPress={() => setSelectedLanguage(option.code)}
                />
              ))}
            </View>

            <Pressable
              onPress={() => void handleContinue()}
              disabled={isApplying}
              accessibilityRole="button"
              className="mt-2 w-full items-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
            >
              <Text className="text-base font-bold text-white">
                {t("auth.languageChoice.continue")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </ScreenSafeAreaView>
  );
}
