import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type SettingsRowProps = {
  label: string;
  icon: ComponentProps<typeof MaterialDesignIcons>["name"];
  onPress?: () => void;
  showDivider?: boolean;
};

export default function SettingsRow({
  label,
  icon,
  onPress,
  showDivider = true,
}: SettingsRowProps) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        className="flex-row items-center px-4 py-4 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name={icon} color={colors.slate500} size={22} />
        <Text className="ml-3 flex-1 text-base font-medium text-heading">
          {label}
        </Text>
        <MaterialDesignIcons name="chevron-right" color={colors.secText} size={22} />
      </Pressable>
      {showDivider ? <View className="ml-12 h-px bg-slate-200" /> : null}
    </View>
  );
}
