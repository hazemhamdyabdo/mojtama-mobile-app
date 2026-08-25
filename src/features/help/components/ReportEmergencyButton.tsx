import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type ReportEmergencyButtonProps = {
  onPress: () => void;
};

export default function ReportEmergencyButton({
  onPress,
}: ReportEmergencyButtonProps) {
  return (
    <View className="bg-white pt-3">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Report Emergency"
        className="flex-row items-center justify-center rounded-2xl bg-[#F25C5C] py-4 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="shield-alert-outline" color="#FFFFFF" size={22} />
        <Text className="ml-2 text-base font-bold text-white">
          Report Emergency
        </Text>
      </Pressable>
    </View>
  );
}
