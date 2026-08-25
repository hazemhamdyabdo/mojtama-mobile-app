import { Text, View } from "react-native";

type ProfileContactCardProps = {
  label: string;
  value: string;
};

export default function ProfileContactCard({
  label,
  value,
}: ProfileContactCardProps) {
  return (
    <View className="flex-1 rounded-xl bg-[#F8FAFC] px-3 py-3">
      <Text className="text-xs text-[#90A1B9]">{label}</Text>
      <Text className="mt-1 text-sm font-medium text-[#1F1F1F]">{value}</Text>
    </View>
  );
}
