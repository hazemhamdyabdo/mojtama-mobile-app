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
    <View className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white px-4 py-4">
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 pr-4 text-base font-semibold text-[#1F1F1F]">
          {title}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#E4E4E7", true: "#C4B5FD" }}
          thumbColor={value ? "#7B61FF" : "#FFFFFF"}
        />
      </View>
      <Text className="mt-2 text-sm leading-5 text-[#90A1B9]">
        {description}
      </Text>
    </View>
  );
}
