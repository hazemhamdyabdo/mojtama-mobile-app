import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import MeetingsHeader from "@/features/meetings/components/MeetingsHeader";
import MeetingsTabs from "@/features/meetings/components/MeetingsTabs";
import { respondToMeeting } from "@/features/meetings/api";
import { filterMeetingsByTab, type MeetingsTab } from "@/features/meetings/constants/dummy";
import { usePostsState } from "@/features/home/hooks/usePostsState";
import { isMeetingPost } from "@/features/home/utils/buildPostFromForm";
import MeetingPostCard from "@/features/home/components/post-types/MeetingPostCard";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function MeetingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { role } = useUserRole();
  const posts = usePostsState();
  const [activeTab, setActiveTab] = useState<MeetingsTab>("upcoming");

  const visibleMeetings = useMemo(
    () => filterMeetingsByTab(posts.filter(isMeetingPost), activeTab),
    [posts, activeTab],
  );

  const openMeetingDetails = (meetingId: string) => {
    router.push({
      pathname: "/meeting/[id]",
      params: { id: meetingId, source: "service" },
    });
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <MeetingsHeader />
        <MeetingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-24"
          showsVerticalScrollIndicator={false}
        >
          {visibleMeetings.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-base font-medium text-heading">
                {t("meetings.empty.title")}
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                {activeTab === "upcoming"
                  ? t("meetings.empty.upcoming")
                  : t("meetings.empty.previous")}
              </Text>
            </View>
          ) : (
            visibleMeetings.map((meeting) => (
              <MeetingPostCard
                key={meeting.id}
                post={meeting}
                variant="service"
                onDetailsPress={() => openMeetingDetails(meeting.id)}
                onAccept={() => void respondToMeeting(meeting.id, "attending")}
                onDecline={() => void respondToMeeting(meeting.id, "declined")}
              />
            ))
          )}
        </ScrollView>

        {role === "admin" ? (
          <Pressable
            onPress={() => router.push("/create-meeting")}
            accessibilityRole="button"
            accessibilityLabel="Create meeting"
            className="absolute bottom-6 right-4 size-14 items-center justify-center rounded-full bg-primary active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="plus" color={colors.white} size={28} />
          </Pressable>
        ) : null}
      </View>
    </ScreenSafeAreaView>
  );
}
