import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type AuthoritiesContactBannerProps = {
  onPress: () => void;
};

export default function AuthoritiesContactBanner({
  onPress,
}: AuthoritiesContactBannerProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mt-3 flex-row items-center justify-between rounded-2xl bg-[#FEE2E2] px-4 py-3.5 active:opacity-[0.92]"
    >
      <Text className="text-sm font-semibold text-[#EF4444]">
        Authorities Contact
      </Text>
      <View className="size-9 items-center justify-center rounded-xl bg-[#EF4444]">
        <MaterialDesignIcons name="phone" color="#FFFFFF" size={18} />
      </View>
    </Pressable>
  );
}
