import { Text, View } from "react-native";

type ProfileStatusBadgeProps = {
  status: string;
};

export default function ProfileStatusBadge({ status }: ProfileStatusBadgeProps) {
  return (
    <View className="rounded-full bg-approved-50 px-2.5 py-0.5">
      <Text className="text-xs font-medium text-approved-500">{status}</Text>
    </View>
  );
}
