import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text } from "react-native";

type BottomSheetIconActionRowProps = {
  label: string;
  icon:
    | "eye-outline"
    | "download-outline"
    | "pencil-outline"
    | "trash-can-outline";
  destructive?: boolean;
  onPress: () => void;
};

export default function BottomSheetIconActionRow({
  label,
  icon,
  destructive = false,
  onPress,
}: BottomSheetIconActionRowProps) {
  const color = destructive ? colors.rejected : colors.slate500;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 py-4 active:opacity-[0.92]"
    >
      <MaterialDesignIcons name={icon} color={color} size={22} />
      <Text
        className={`text-base font-medium ${
          destructive ? "text-rejected-500" : "text-heading"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
