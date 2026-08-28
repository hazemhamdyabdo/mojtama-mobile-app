import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PaymentDetailsHeader() {
  const router = useRouter();

  return (
    <View className="relative mb-6 flex-row items-center justify-center">
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="absolute left-0 active:opacity-[0.92]"
      >
        <View className="size-10 items-center justify-center rounded-full border border-card-border bg-white">
          <MaterialDesignIcons name="chevron-left" color={colors.primary} size={24} />
        </View>
      </Pressable>

      <Text className="text-lg font-bold text-heading">Payment Details</Text>
    </View>
  );
}
