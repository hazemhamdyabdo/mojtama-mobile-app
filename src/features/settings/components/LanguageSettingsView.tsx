import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import LanguageOptionCard from "@/features/auth/components/LanguageOptionCard";
import {
  changeLanguage,
  getActiveLanguage,
  type SupportedLanguage,
} from "@/localization/i18n";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
const SETTINGS_LANGUAGE_HREF = "/(tabs)/more";

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

type LanguageSettingsViewProps = {
  onBack: () => void;
};

export default function LanguageSettingsView({
  onBack,
}: LanguageSettingsViewProps) {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(getActiveLanguage);
  const [isApplying, setIsApplying] = useState(false);

  const handleSelectLanguage = async (language: SupportedLanguage) => {
    if (isApplying || language === selectedLanguage) {
      return;
    }

    const previousLanguage = selectedLanguage;
    setSelectedLanguage(language);
    setIsApplying(true);

    try {
      await changeLanguage(language, SETTINGS_LANGUAGE_HREF);
    } catch (error) {
      console.warn("Failed to change language", error);
      setSelectedLanguage(previousLanguage);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative mb-6 flex-row items-center justify-center">
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={t("settings.language.back")}
            className="absolute left-0 active:opacity-[0.92]"
          >
            <View className="size-10 items-center justify-center rounded-full bg-primary-50">
              <MaterialDesignIcons
                name="chevron-left"
                color={colors.primary}
                size={24}
              />
            </View>
          </Pressable>

          <Text className="text-lg font-bold text-heading">
            {t("settings.language.title")}
          </Text>
        </View>

        <View className="gap-1">
          <Text className="text-2xl font-semibold text-heading">
            {t("settings.language.selectTitle")}
          </Text>
          <Text className="text-sm text-sec-text">
            {t("settings.language.selectSubtitle")}
          </Text>
        </View>

        <View className="mt-6 gap-4">
          {languageOptions.map((option) => (
            <LanguageOptionCard
              key={option.code}
              title={t(option.titleKey)}
              subtitle={t(option.subtitleKey)}
              flagSource={option.flag}
              selected={selectedLanguage === option.code}
              onPress={() => void handleSelectLanguage(option.code)}
            />
          ))}
        </View>

        <View className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <Text className="text-sm font-bold text-heading">
            {t("settings.language.infoTitle")}
          </Text>
          <Text className="mt-2 text-sm text-sec-text">
            {t("settings.language.infoDescription")}
          </Text>
        </View>
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
