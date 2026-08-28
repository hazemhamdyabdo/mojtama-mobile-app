import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type CreatePostScreenLayoutProps = {
  children: ReactNode;
};

export default function CreatePostScreenLayout({
  children,
}: CreatePostScreenLayoutProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-2">
        <View className="relative mb-4 flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t("common.back")}
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
            {t("home.createPost.screenTitle")}
          </Text>
        </View>

        {children}
      </View>
    </ScreenSafeAreaView>
  );
}
