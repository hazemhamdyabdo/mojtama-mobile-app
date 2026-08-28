import { APP_BUILD, APP_VERSION } from "@/features/settings/constants/dummy";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SettingsFooter() {
  const { t } = useTranslation();

  return (
    <View className="items-center py-6">
      <Text className="text-sm text-sec-text">
        {t("settings.footer.version", { version: `${APP_VERSION} (${APP_BUILD})` })}
      </Text>
      <Text className="mt-1 text-sm text-sec-text">
        {t("settings.footer.copyright")}
      </Text>
    </View>
  );
}
