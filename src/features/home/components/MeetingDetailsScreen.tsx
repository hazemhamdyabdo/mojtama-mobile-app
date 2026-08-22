import CommentsBottomSheet, {
  type CommentsBottomSheetRef,
} from "@/features/home/components/CommentsBottomSheet";
import LikesBottomSheet, {
  type LikesBottomSheetRef,
} from "@/features/home/components/LikesBottomSheet";
import PostActionsBottomSheet, {
  type PostActionsBottomSheetRef,
} from "@/features/home/components/PostActionsBottomSheet";
import { DUMMY_POSTS } from "@/features/home/constants/dummy";
import type {
  AttendeeStatus,
  MeetingAttendee,
  MeetingPost,
} from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as SafeAreaViewRN } from "react-native-safe-area-context";

const SafeAreaView = styled(SafeAreaViewRN);

type AttendeeTab = "team" | "residents";

type InfoRowProps = {
  label: string;
  value: string;
  accent?: string;
};

function InfoRow({ label, value, accent }: InfoRowProps) {
  return (
    <View className="flex-row items-start justify-between px-4 py-2.5">
      <Text className="text-base text-[#64748B]">{label}</Text>
      <View className="max-w-[58%] flex-row flex-wrap items-center justify-end gap-1">
        <Text className="text-right text-base font-normal text-[#1F1F1F]">
          {value}
        </Text>
        {accent ? (
          <Text className="text-base font-normal text-[#7B61FF]">
            ({accent})
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type AttendeeStatusBadgeProps = {
  status: AttendeeStatus;
};

function AttendeeStatusBadge({ status }: AttendeeStatusBadgeProps) {
  switch (status) {
    case "attending":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="check-circle-outline"
            color="#22C55E"
            size={18}
          />
          <Text className="text-sm font-medium text-[#22C55E]">Attending</Text>
        </View>
      );
    case "declined":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="close-circle-outline"
            color="#EF4444"
            size={18}
          />
          <Text className="text-sm font-medium text-[#EF4444]">Declined</Text>
        </View>
      );
    case "awaiting":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="alert-circle-outline"
            color="#F59E0B"
            size={18}
          />
          <Text className="text-sm font-medium text-[#F59E0B]">Awaiting</Text>
        </View>
      );
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

type AttendeeRowProps = {
  attendee: MeetingAttendee;
};

function AttendeeRow({ attendee }: AttendeeRowProps) {
  return (
    <View className="mb-4 flex-row items-center">
      {attendee.avatar ? (
        <Image
          source={attendee.avatar}
          contentFit="cover"
          style={{ width: 44, height: 44, borderRadius: 100 }}
        />
      ) : (
        <View className="size-11 items-center justify-center rounded-full bg-[#F0EDFF]">
          <Text className="text-sm font-semibold text-[#7B61FF]">
            {getInitials(attendee.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-[#1F1F1F]">
          {attendee.name}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-0.5">
          <MaterialDesignIcons
            name="map-marker-outline"
            color="#90A1B9"
            size={14}
          />
          <Text className="text-sm text-[#90A1B9]">{attendee.unit}</Text>
        </View>
      </View>

      <AttendeeStatusBadge status={attendee.status} />
    </View>
  );
}

function getMeetingPost(id: string | undefined): MeetingPost {
  const post = DUMMY_POSTS.find((item) => item.id === id);

  if (post?.type === "meeting") {
    return post;
  }

  const fallback = DUMMY_POSTS.find((item) => item.type === "meeting");

  if (fallback?.type === "meeting") {
    return fallback;
  }

  throw new Error("No meeting post found in dummy data");
}

export default function MeetingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<AttendeeTab>("residents");

  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);

  const meeting = getMeetingPost(id);
  const displayedLikes = meeting.likesCount + (liked ? 1 : 0);

  const teamAttendees = useMemo(
    () => meeting.attendees.filter((attendee) => attendee.group === "team"),
    [meeting.attendees],
  );

  const residentAttendees = useMemo(
    () =>
      meeting.attendees.filter((attendee) => attendee.group === "residents"),
    [meeting.attendees],
  );

  const visibleAttendees =
    activeTab === "team" ? teamAttendees : residentAttendees;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="relative mx-4 mb-4 mt-2 flex-row items-center justify-center">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-0 active:opacity-[0.92]"
        >
          <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
            <MaterialDesignIcons
              name="chevron-left"
              color="#7B61FF"
              size={24}
            />
          </View>
        </Pressable>

        <Text className="text-lg font-bold text-[#1F1F1F]">
          Meeting Details
        </Text>

        <Pressable
          onPress={() => postActionsSheetRef.current?.open(meeting.id)}
          accessibilityRole="button"
          accessibilityLabel="Meeting options"
          hitSlop={8}
          className="absolute right-0 active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="dots-vertical" color="#1F1F1F" size={24} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3 flex-row items-start justify-between gap-3">
          <Text className="flex-1 text-xl font-bold text-[#1F1F1F]">
            {meeting.title}
          </Text>
          <View className="rounded-full bg-[#F0EDFF] px-3 py-1">
            <Text className="text-xs font-semibold text-[#7B61FF]">
              {meeting.category}
            </Text>
          </View>
        </View>

        <Text className="text-sm leading-5 text-[#64748B]">{meeting.body}</Text>

        <View className="mt-4 flex-row items-center gap-5">
          <View className="flex-row items-center gap-1.5">
            <Pressable
              onPress={() => setLiked((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel={liked ? "Unlike meeting" : "Like meeting"}
              hitSlop={8}
              className="active:opacity-[0.92]"
            >
              <MaterialDesignIcons
                name={liked ? "thumb-up" : "thumb-up-outline"}
                color={liked ? "#7B61FF" : "#90A1B9"}
                size={18}
              />
            </Pressable>

            <Pressable
              onPress={() => likesSheetRef.current?.open(meeting.id)}
              accessibilityRole="button"
              accessibilityLabel="View likes"
              hitSlop={8}
              className="active:opacity-[0.92]"
            >
              <Text className="text-sm text-[#90A1B9]">
                {displayedLikes.toLocaleString()} Likes
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => commentsSheetRef.current?.open(meeting.id)}
            accessibilityRole="button"
            accessibilityLabel="View comments"
            hitSlop={8}
            className="flex-row items-center gap-1.5 active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name="comment-outline"
              color="#90A1B9"
              size={18}
            />
            <Text className="text-sm text-[#90A1B9]">
              {meeting.commentsCount.toLocaleString()} Comments
            </Text>
          </Pressable>

          <View className="flex-row items-center gap-1.5">
            <MaterialDesignIcons name="eye-outline" color="#90A1B9" size={18} />
            <Text className="text-sm text-[#90A1B9]">
              {meeting.viewsCount.toLocaleString()} Views
            </Text>
          </View>
        </View>

        <Text className="mb-3 mt-6 text-base font-bold text-[#1F1F1F]">
          Meeting information
        </Text>

        <View className="rounded-2xl border border-[#E4E4E7] bg-white">
          <InfoRow label="Agenda" value={meeting.agenda} />
          <InfoRow label="Date" value={meeting.date} />
          <InfoRow
            label="Time"
            value={meeting.time}
            accent={meeting.duration}
          />
          <InfoRow label="Location" value={meeting.location} />
          {meeting.meetingLink ? (
            <InfoRow label="Meeting link" value={meeting.meetingLink} />
          ) : null}
          <InfoRow label="Created by" value={meeting.createdBy} />
          <InfoRow label="Led by" value={meeting.leadBy.name} />
          <InfoRow
            label="Visibility"
            value={meeting.visibility}
            accent={meeting.isPublic ? "Public" : undefined}
          />
        </View>

        <Text className="mb-3 mt-6 text-base font-bold text-[#1F1F1F]">
          Attendees
        </Text>

        <View className="mb-4 flex-row border-b border-[#E4E4E7]">
          <Pressable
            onPress={() => setActiveTab("team")}
            accessibilityRole="button"
            className={`mr-6 pb-3 active:opacity-[0.92] ${
              activeTab === "team" ? "border-b-2 border-[#7B61FF]" : ""
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === "team" ? "text-[#7B61FF]" : "text-[#90A1B9]"
              }`}
            >
              Mojtama Team ({teamAttendees.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("residents")}
            accessibilityRole="button"
            className={`pb-3 active:opacity-[0.92] ${
              activeTab === "residents" ? "border-b-2 border-[#7B61FF]" : ""
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === "residents" ? "text-[#7B61FF]" : "text-[#90A1B9]"
              }`}
            >
              Residents ({residentAttendees.length})
            </Text>
          </Pressable>
        </View>

        <View>
          {visibleAttendees.map((attendee) => (
            <AttendeeRow key={attendee.id} attendee={attendee} />
          ))}
        </View>

        <Text className="mb-3 mt-2 text-base font-bold text-[#1F1F1F]">
          Agenda
        </Text>

        <View className="rounded-2xl border border-[#E4E4E7] bg-white px-4 py-4">
          {meeting.agendaItems.map((item, index) => (
            <View key={item.id} className="flex-row">
              <View className="mr-3 items-center">
                <View className="size-3 rounded-full bg-[#7B61FF]" />
                {index < meeting.agendaItems.length - 1 ? (
                  <View className="my-1 w-px flex-1 bg-[#E4E4E7]" />
                ) : null}
              </View>

              <View
                className={`flex-1 ${index < meeting.agendaItems.length - 1 ? "pb-5" : ""}`}
              >
                <Text className="text-base font-semibold text-[#1F1F1F]">
                  {item.title}
                </Text>
                <Text className="mt-0.5 text-sm text-[#90A1B9]">
                  {item.timeRange}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row gap-3 border-t border-[#E4E4E7] px-4 py-4">
        <Pressable
          onPress={() => console.log("accept meeting:", meeting.id)}
          accessibilityRole="button"
          className="flex-1 items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">Accept</Text>
        </Pressable>

        <Pressable
          onPress={() => console.log("decline meeting:", meeting.id)}
          accessibilityRole="button"
          className="flex-1 items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-[#1F1F1F]">Decline</Text>
        </Pressable>
      </View>

      <LikesBottomSheet ref={likesSheetRef} />

      <CommentsBottomSheet
        ref={commentsSheetRef}
        onSendComment={(postId, text) =>
          console.log("send comment:", postId, text)
        }
      />

      <PostActionsBottomSheet
        ref={postActionsSheetRef}
        onMoveToDraft={(postId) => console.log("move to draft:", postId)}
        onEditPost={(postId) => console.log("edit post:", postId)}
        onMarkAsUrgent={(postId, isUrgent) =>
          console.log("mark as urgent:", postId, isUrgent)
        }
        onDeletePost={(postId) => console.log("delete post:", postId)}
      />
    </SafeAreaView>
  );
}
