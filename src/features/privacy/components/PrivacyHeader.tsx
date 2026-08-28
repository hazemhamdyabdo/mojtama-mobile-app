import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function PrivacyHeader() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="relative mb-6 flex-row items-center justify-center">
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel={t("common.back")}
        className="absolute left-0 active:opacity-[0.92]"
      >
        <View className="size-10 items-center justify-center rounded-full bg-primary-50">
          <MaterialDesignIcons name="chevron-left" color={colors.primary} size={24} />
        </View>
      </Pressable>

      <Text className="text-lg font-bold text-heading">{t("privacy.title")}</Text>
    </View>
  );
}
