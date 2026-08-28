import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type VisitorFormSelectFieldProps = {
  label: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  error?: string;
  icon?: "chevron-down" | "calendar-blank-outline" | "clock-outline";
  onPress: () => void;
};

export default function VisitorFormSelectField({
  label,
  placeholder,
  value,
  required = false,
  error,
  icon = "chevron-down",
  onPress,
}: VisitorFormSelectFieldProps) {
  return (
    <View className="mb-4 flex-1">
      <Text className="mb-2 text-sm font-semibold text-heading">
        {label}
        {required ? <Text className="text-rejected">*</Text> : null}
      </Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
          error ? "border-rejected-200" : "border-card-border"
        }`}
      >
        <Text
          className={`flex-1 text-base ${
            value ? "text-heading" : "text-sec-text"
          }`}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <MaterialDesignIcons name={icon} color={colors.secText} size={20} />
      </Pressable>
      {error ? (
        <Text className="mt-2 text-sm text-rejected">{error}</Text>
      ) : null}
    </View>
  );
}
