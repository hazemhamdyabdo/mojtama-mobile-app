import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text } from "react-native";

type TimeFieldProps = {
  value: Date | null;
  placeholder: string;
  hasError: boolean;
  onPress: () => void;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TimeField({
  value,
  placeholder,
  hasError,
  onPress,
}: TimeFieldProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={`flex-1 flex-row items-center gap-2 rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
        hasError ? "border-rejected-200" : "border-card-border"
      }`}
    >
      <MaterialDesignIcons name="clock-outline" color={colors.slate500} size={20} />
      <Text
        className={`text-base ${value ? "text-heading" : "text-sec-text"}`}
      >
        {value ? formatTime(value) : placeholder}
      </Text>
    </Pressable>
  );
}
