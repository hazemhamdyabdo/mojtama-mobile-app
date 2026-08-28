import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HelpFaqsIntro() {
  const { t } = useTranslation();

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold text-heading">
        {t("help.faqs.title")}
      </Text>
    </View>
  );
}
