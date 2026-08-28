import { colors } from "@/theme/colors";
import { Switch, Text, View } from "react-native";

type SettingToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  showDivider?: boolean;
};

export default function SettingToggle({
  label,
  value,
  onChange,
  showDivider = false,
}: SettingToggleProps) {
  return (
    <View
      className={`flex-row items-center justify-between py-4 ${
        showDivider ? "border-b border-slate-100" : ""
      }`}
    >
      <Text className="flex-1 pr-4 text-base text-slate-500">{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.slate200, true: colors.primary300 }}
        thumbColor={value ? colors.primary : colors.white}
      />
    </View>
  );
}
