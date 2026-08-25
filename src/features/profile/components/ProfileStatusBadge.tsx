import { Text, View } from "react-native";

type ProfileStatusBadgeProps = {
  status: string;
};

export default function ProfileStatusBadge({ status }: ProfileStatusBadgeProps) {
  return (
    <View className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5">
      <Text className="text-xs font-medium text-[#22C55E]">{status}</Text>
    </View>
  );
}
