import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type ReportEmergencyButtonProps = {
  onPress: () => void;
};

export default function ReportEmergencyButton({
  onPress,
}: ReportEmergencyButtonProps) {
  const { t } = useTranslation();

  return (
    <View className="bg-white pt-3">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={t("help.reportEmergency")}
        className="flex-row items-center justify-center rounded-2xl bg-rejected-500 py-4 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="shield-alert-outline" color={colors.white} size={22} />
        <Text className="ml-2 text-base font-bold text-white">
          {t("help.reportEmergency")}
        </Text>
      </Pressable>
    </View>
  );
}
