import { Pressable, Text } from "react-native";

type CategoryTypeChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryTypeChip({
  label,
  selected,
  onPress,
}: CategoryTypeChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full px-4 py-2.5 active:opacity-[0.92] ${
        selected ? "bg-primary-50" : "border border-slate-200 bg-slate-50"
      }`}
    >
      <Text
        className={`text-sm ${
          selected
            ? "font-semibold text-primary"
            : "font-medium text-slate-500"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
