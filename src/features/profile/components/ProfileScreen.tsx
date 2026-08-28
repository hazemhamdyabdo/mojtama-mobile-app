import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileInfoCard from "@/features/profile/components/ProfileInfoCard";
import ProfileTabContent from "@/features/profile/components/ProfileTabContent";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import { useUserState } from "@/features/settings/hooks/useUserState";
import type { ProfileTab } from "@/features/profile/types";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("support-requests");
  const profile = useUserState();

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <ProfileInfoCard
          profile={profile}
          onEditAvatarPress={() => console.log("edit avatar")}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ProfileTabContent activeTab={activeTab} />
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
