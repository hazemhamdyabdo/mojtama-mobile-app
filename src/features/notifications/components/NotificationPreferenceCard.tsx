import { colors } from "@/theme/colors";
import { Switch, Text, View } from "react-native";

type NotificationPreferenceCardProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function NotificationPreferenceCard({
  title,
  description,
  value,
  onValueChange,
}: NotificationPreferenceCardProps) {
  return (
    <View className="mb-4 rounded-2xl border border-card-border bg-white px-4 py-4">
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 pr-4 text-base font-semibold text-heading">
          {title}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.slate200, true: colors.primary300 }}
          thumbColor={value ? colors.primary : colors.white}
        />
      </View>
      <Text className="mt-2 text-sm leading-5 text-sec-text">
        {description}
      </Text>
    </View>
  );
}
