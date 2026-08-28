import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SettingsHeader() {
  const { t } = useTranslation();

  return (
    <View className="mb-6 items-center justify-center">
      <Text className="text-lg font-bold text-heading">{t("settings.title")}</Text>
    </View>
  );
}
