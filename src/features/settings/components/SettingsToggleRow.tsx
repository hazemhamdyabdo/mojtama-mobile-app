import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Switch, Text, View } from "react-native";

type SettingsToggleRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  showDivider?: boolean;
};

export default function SettingsToggleRow({
  label,
  value,
  onValueChange,
  showDivider = true,
}: SettingsToggleRowProps) {
  return (
    <View>
      <View className="flex-row items-center px-4 py-4">
        <MaterialDesignIcons
          name="weather-night"
          color="#64748B"
          size={22}
        />
        <Text className="ml-3 flex-1 text-base font-medium text-[#1F1F1F]">
          {label}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E4E4E7", true: "#C4B5FD" }}
          thumbColor={value ? "#7B61FF" : "#FFFFFF"}
        />
      </View>
      {showDivider ? <View className="ml-12 h-px bg-[#E4E4E7]" /> : null}
    </View>
  );
}
