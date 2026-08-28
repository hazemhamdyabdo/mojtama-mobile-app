import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type BottomSheetMenuActionRowProps = {
  label: string;
  onPress?: () => void;
  labelClassName?: string;
  rightElement?: ReactNode;
};

export default function BottomSheetMenuActionRow({
  label,
  onPress,
  labelClassName = "text-base text-heading font-semibold",
  rightElement,
}: BottomSheetMenuActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      className="flex-row items-center justify-between border-b border-slate-100 px-1 py-4 active:opacity-[0.92]"
    >
      <Text className={labelClassName}>{label}</Text>
      {rightElement}
    </Pressable>
  );
}
