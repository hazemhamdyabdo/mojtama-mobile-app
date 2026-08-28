import { colors } from "@/theme/colors";
import MeetingsHeader from "@/features/meetings/components/MeetingsHeader";
import MeetingsTabs from "@/features/meetings/components/MeetingsTabs";
import {
  filterMeetingsByTab,
  getMeetingPosts,
  type MeetingsTab,
} from "@/features/meetings/constants/dummy";
import MeetingPostCard from "@/features/home/components/post-types/MeetingPostCard";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function MeetingsScreen() {
  const router = useRouter();
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState<MeetingsTab>("upcoming");

  const visibleMeetings = useMemo(
    () => filterMeetingsByTab(getMeetingPosts(), activeTab),
    [activeTab],
  );

  const openMeetingDetails = (meetingId: string) => {
    router.push({
      pathname: "/meeting/[id]",
      params: { id: meetingId, source: "service" },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
                No Meetings
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                {activeTab === "upcoming"
                  ? "Upcoming meetings will appear here."
                  : "Previous meetings will appear here."}
              </Text>
            </View>
          ) : (
            visibleMeetings.map((meeting) => (
              <MeetingPostCard
                key={meeting.id}
                post={meeting}
                variant="service"
                onDetailsPress={() => openMeetingDetails(meeting.id)}
                onAccept={() => console.log("accept meeting:", meeting.id)}
                onDecline={() => console.log("decline meeting:", meeting.id)}
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
    </SafeAreaView>
  );
}
