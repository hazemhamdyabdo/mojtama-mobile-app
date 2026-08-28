import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function PrivacyIntro() {
  const { t } = useTranslation();

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-heading">
        {t("privacy.intro.title")}
      </Text>
    </View>
  );
}
