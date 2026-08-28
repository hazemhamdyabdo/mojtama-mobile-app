import type { ReactNode } from "react";
import { Text, View } from "react-native";

type MeetingServiceInfoRowProps = {
  label: string;
  children: ReactNode;
};

export default function MeetingServiceInfoRow({
  label,
  children,
}: MeetingServiceInfoRowProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between gap-4">
      <Text className="w-1/3 text-sm text-sec-text">{label}</Text>
      <View className="flex-1 items-start">{children}</View>
    </View>
  );
}
