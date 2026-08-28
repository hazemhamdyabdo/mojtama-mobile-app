import type { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-sm font-semibold text-slate-500">{title}</Text>
      <View className="overflow-hidden rounded-2xl border border-card-border bg-white">
        {children}
      </View>
    </View>
  );
}
