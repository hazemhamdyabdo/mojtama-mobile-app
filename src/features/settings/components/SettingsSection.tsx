import type { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-sm font-semibold text-[#64748B]">{title}</Text>
      <View className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
        {children}
      </View>
    </View>
  );
}
