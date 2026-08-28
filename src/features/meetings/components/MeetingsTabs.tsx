import { MEETINGS_TABS, type MeetingsTab } from "@/features/meetings/constants/dummy";
import { Pressable, Text, View } from "react-native";

type MeetingsTabsProps = {
  activeTab: MeetingsTab;
  onTabChange: (tab: MeetingsTab) => void;
};

export default function MeetingsTabs({
  activeTab,
  onTabChange,
}: MeetingsTabsProps) {
  return (
    <View className="mb-6 flex-row rounded-xl bg-[#F1F5F9] p-1">
      {MEETINGS_TABS.map((tab) => {
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
              className={`text-sm font-medium ${
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
