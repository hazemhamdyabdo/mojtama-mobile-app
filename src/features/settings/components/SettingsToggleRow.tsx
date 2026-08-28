import { colors } from "@/theme/colors";
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
          color={colors.slate500}
          size={22}
        />
        <Text className="ml-3 flex-1 text-base font-medium text-heading">
          {label}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.slate200, true: colors.primary300 }}
          thumbColor={value ? colors.primary : colors.white}
        />
      </View>
      {showDivider ? <View className="ml-12 h-px bg-slate-200" /> : null}
    </View>
  );
}
