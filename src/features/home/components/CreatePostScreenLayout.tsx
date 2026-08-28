import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as SafeAreaViewType } from "react-native-safe-area-context";

const SafeAreaView = styled(SafeAreaViewType);

type CreatePostScreenLayoutProps = {
  children: ReactNode;
};

export default function CreatePostScreenLayout({
  children,
}: CreatePostScreenLayoutProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-2">
        <View className="relative mb-4 flex-row items-center justify-center">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
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

          <Text className="text-lg font-bold text-heading">Create Post</Text>
        </View>

        {children}
      </View>
    </SafeAreaView>
  );
}
