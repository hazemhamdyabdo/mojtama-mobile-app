import { PROFILE_TABS } from "@/features/profile/constants/dummy";
import type { ProfileTab } from "@/features/profile/types";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const PROFILE_TAB_I18N_KEYS: Record<ProfileTab, string> = {
  "support-requests": "supportRequests",
  payments: "payments",
  visitations: "visitations",
};

type ProfileTabsProps = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-4 flex-row rounded-xl bg-slate-100 p-1">
      {PROFILE_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            className={`flex-1 items-center rounded-lg px-2 py-2.5 active:opacity-[0.92] ${
              isActive ? "bg-primary-50" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-sm font-medium ${
                isActive ? "text-primary" : "text-slate-500"
              }`}
            >
              {t(`profile.tabs.${PROFILE_TAB_I18N_KEYS[tab.id]}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
