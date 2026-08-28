import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type AuthoritiesContactBannerProps = {
  onPress: () => void;
};

export default function AuthoritiesContactBanner({
  onPress,
}: AuthoritiesContactBannerProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mt-3 flex-row items-center justify-between rounded-2xl bg-rejected-50 px-4 py-3.5 active:opacity-[0.92]"
    >
      <Text className="text-sm font-semibold text-rejected">
        {t("requests.authorities.banner")}
      </Text>
      <View className="size-9 items-center justify-center rounded-xl bg-rejected">
        <MaterialDesignIcons name="phone" color={colors.white} size={18} />
      </View>
    </Pressable>
  );
}
