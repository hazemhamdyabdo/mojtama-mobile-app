import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileInfoCard from "@/features/profile/components/ProfileInfoCard";
import ProfileTabContent from "@/features/profile/components/ProfileTabContent";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import { PROFILE_USER } from "@/features/profile/constants/dummy";
import type { ProfileTab } from "@/features/profile/types";
import { styled } from "nativewind";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("support-requests");

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <ProfileInfoCard
          profile={PROFILE_USER}
          onEditAvatarPress={() => console.log("edit avatar")}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ProfileTabContent activeTab={activeTab} />
      </ScrollView>
    </SafeAreaView>
  );
}
