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
    <View className="flex-1 rounded-xl bg-slate-50 px-3 py-3">
      <Text className="text-xs text-sec-text">{label}</Text>
      <Text className="mt-1 text-sm font-medium text-heading">{value}</Text>
    </View>
  );
}
