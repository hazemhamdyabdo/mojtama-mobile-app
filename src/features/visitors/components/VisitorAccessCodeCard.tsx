import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type VisitorAccessCodeCardProps = {
  accessCode: string;
  onQrPress?: () => void;
};

export default function VisitorAccessCodeCard({
  accessCode,
  onQrPress,
}: VisitorAccessCodeCardProps) {
  const { t } = useTranslation();

  return (
    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
      <View>
        <Text className="text-sm text-sec-text">{t("visitors.card.accessCode")}</Text>
        <Text className="mt-1 text-lg font-bold text-heading">
          {accessCode}
        </Text>
      </View>

      <Pressable
        onPress={onQrPress}
        accessibilityRole="button"
        accessibilityLabel={t("visitors.a11y.showQrCode")}
        className="active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="qrcode" color={colors.primary} size={36} />
      </Pressable>
    </View>
  );
}
