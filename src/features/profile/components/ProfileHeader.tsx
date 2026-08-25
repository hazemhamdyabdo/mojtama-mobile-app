import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <View className="relative mb-6 flex-row items-center justify-center">
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="absolute left-0 active:opacity-[0.92]"
      >
        <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
          <MaterialDesignIcons name="chevron-left" color="#7B61FF" size={24} />
        </View>
      </Pressable>

      <Text className="text-lg font-bold text-[#1F1F1F]">Profile</Text>
    </View>
  );
}
