import type { ProfileTab } from "@/features/profile/types";
import { PROFILE_TABS } from "@/features/profile/constants/dummy";
import { Pressable, Text, View } from "react-native";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <View className="mb-4 flex-row rounded-xl bg-[#F1F5F9] p-1">
      {PROFILE_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            className={`flex-1 items-center rounded-lg px-2 py-2.5 active:opacity-[0.92] ${
              isActive ? "bg-[#F0EDFF]" : "bg-transparent"
            }`}
          >
            <Text
              numberOfLines={1}
              className={`text-center text-xs font-medium ${
                isActive ? "text-[#7B61FF]" : "text-[#64748B]"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
