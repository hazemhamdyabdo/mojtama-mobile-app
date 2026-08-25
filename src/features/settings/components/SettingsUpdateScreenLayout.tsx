import SettingsUpdateHeader from "@/features/settings/components/SettingsUpdateHeader";
import { styled } from "nativewind";
import type { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type SettingsUpdateScreenLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function SettingsUpdateScreenLayout({
  title,
  children,
}: SettingsUpdateScreenLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SettingsUpdateHeader title={title} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
