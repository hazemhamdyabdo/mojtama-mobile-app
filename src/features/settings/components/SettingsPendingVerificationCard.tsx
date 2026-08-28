import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function SettingsPendingVerificationCard() {
  const { t } = useTranslation();

  return (
    <View className="mt-8 flex-row rounded-2xl border border-card-border bg-white p-4">
      <View className="size-10 items-center justify-center rounded-full bg-primary-50">
        <MaterialDesignIcons
          name="help-circle-outline"
          color={colors.primary}
          size={22}
        />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-heading">
          {t("settings.pendingVerification.title")}
        </Text>
      </View>
    </View>
  );
}
