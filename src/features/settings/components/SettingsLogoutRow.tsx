import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text } from "react-native";

type SettingsLogoutRowProps = {
  onPress?: () => void;
};

export default function SettingsLogoutRow({ onPress }: SettingsLogoutRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center px-4 py-4 active:opacity-[0.92]"
    >
      <MaterialDesignIcons name="logout" color="#EF4444" size={22} />
      <Text className="ml-3 text-base font-medium text-[#EF4444]">Log Out</Text>
    </Pressable>
  );
}
