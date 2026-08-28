import type { ReactNode } from "react";
import { Text, View } from "react-native";

type MeetingDetailRowProps = {
  label: string;
  children: ReactNode;
};

export default function MeetingDetailRow({
  label,
  children,
}: MeetingDetailRowProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-sm text-sec-text">{label}</Text>
      {children}
    </View>
  );
}
