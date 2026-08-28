import { colors } from "@/theme/colors";
import CommentsBottomSheet, {
  type CommentsBottomSheetRef,
} from "@/features/home/components/CommentsBottomSheet";
import LikesBottomSheet, {
  type LikesBottomSheetRef,
} from "@/features/home/components/LikesBottomSheet";
import PostActionsBottomSheet, {
  type PostActionsBottomSheetRef,
} from "@/features/home/components/PostActionsBottomSheet";
import type {
  AttendeeStatus,
  MeetingAttendee,
  MeetingPost,
} from "@/features/home/types";
import { getMeetingPostById } from "@/features/meetings/constants/dummy";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as SafeAreaViewRN } from "react-native-safe-area-context";

const SafeAreaView = styled(SafeAreaViewRN);

type AttendeeTab = "team" | "residents";

type MeetingDetailsScreenProps = {
  variant?: "feed" | "service";
};

type InfoRowProps = {
  label: string;
  value: string;
  accent?: string;
};

function InfoRow({ label, value, accent }: InfoRowProps) {
  return (
    <View className="flex-row items-start justify-between px-4 py-2.5">
      <Text className="text-base text-slate-500">{label}</Text>
      <View className="max-w-[58%] flex-row flex-wrap items-center justify-end gap-1">
        <Text className="text-right text-base font-normal text-heading">
          {value}
        </Text>
        {accent ? (
          <Text className="text-base font-normal text-primary">
            ({accent})
          </Text>
        ) : null}
      </View>
    </View>
  );
}

type ServiceInfoRowProps = {
  label: string;
  children: ReactNode;
};

function ServiceInfoRow({ label, children }: ServiceInfoRowProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between gap-4">
      <Text className="w-1/3 text-sm text-sec-text">{label}</Text>
      <View className="flex-1 items-start">{children}</View>
    </View>
  );
}

type ScheduleCardProps = {
  label: string;
  value: string;
  icon: "calendar" | "clock";
};

function ScheduleCard({ label, value, icon }: ScheduleCardProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
      <Text className="text-sm font-semibold text-heading">{label}</Text>
      <View className="flex-row items-center gap-1.5">
        <MaterialDesignIcons
          name={
            icon === "calendar" ? "calendar-blank-outline" : "clock-outline"
          }
          color={colors.slate500}
          size={16}
        />
        <Text className="text-sm text-slate-500">{value}</Text>
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
            color={colors.approved500}
            size={18}
          />
          <Text className="text-sm font-medium text-approved-500">Attending</Text>
        </View>
      );
    case "declined":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="close-circle-outline"
            color={colors.rejected}
            size={18}
          />
          <Text className="text-sm font-medium text-rejected">Declined</Text>
        </View>
      );
    case "awaiting":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="alert-circle-outline"
            color={colors.pending600}
            size={18}
          />
          <Text className="text-sm font-medium text-pending-600">Awaiting</Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      return exhaustive;
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
        <View className="size-11 items-center justify-center rounded-full bg-primary-50">
          <Text className="text-sm font-semibold text-primary">
            {getInitials(attendee.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-heading">
          {attendee.name}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-0.5">
          <MaterialDesignIcons
            name="map-marker-outline"
            color={colors.secText}
            size={14}
          />
          <Text className="text-sm text-sec-text">{attendee.unit}</Text>
        </View>
      </View>

      <AttendeeStatusBadge status={attendee.status} />
    </View>
  );
}

function getMeetingPost(id: string | undefined): MeetingPost | undefined {
  return getMeetingPostById(id);
}

export default function MeetingDetailsScreen({
  variant = "feed",
}: MeetingDetailsScreenProps) {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const meetingId = Array.isArray(id) ? id[0] : id;
  const [liked, setLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<AttendeeTab>("residents");

  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);

  const meeting = getMeetingPost(meetingId);
  const isService = variant === "service";
  const isUpcoming = meeting?.status.toLowerCase() === "upcoming";

  const displayedLikes = (meeting?.likesCount ?? 0) + (liked ? 1 : 0);

  const teamAttendees = useMemo(
    () =>
      meeting?.attendees.filter((attendee) => attendee.group === "team") ?? [],
    [meeting?.attendees],
  );

  const residentAttendees = useMemo(
    () =>
      meeting?.attendees.filter((attendee) => attendee.group === "residents") ??
      [],
    [meeting?.attendees],
  );

  const visibleAttendees =
    activeTab === "team" ? teamAttendees : residentAttendees;

  if (!meeting) {
    return <Redirect href={isService ? "/meetings" : "/"} />;
  }

  const shouldTruncate = meeting.body.length > 120;
  const description =
    isExpanded || !shouldTruncate
      ? meeting.body
      : `${meeting.body.slice(0, 120)}...`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="relative mx-4 mb-4 mt-2 flex-row items-center justify-center">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-0 active:opacity-[0.92]"
        >
          <View className="size-10 items-center justify-center rounded-full bg-primary-50">
            <MaterialDesignIcons
              name="chevron-left"
              color={colors.primary}
              size={24}
            />
          </View>
        </Pressable>

        <Text className="text-lg font-bold text-heading">
          {isService ? "Meetings" : "Meeting Details"}
        </Text>

        {!isService ? (
          <Pressable
            onPress={() => postActionsSheetRef.current?.open(meeting.id)}
            accessibilityRole="button"
            accessibilityLabel="Meeting options"
            hitSlop={8}
            className="absolute right-0 active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="dots-vertical" color={colors.heading} size={24} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6"
        showsVerticalScrollIndicator={false}
      >
        {isService ? (
          <>
            <Text className="text-2xl font-bold text-heading">
              {meeting.title}
            </Text>

            <Text className="mt-3 text-sm leading-5 text-slate-500">
              {description}
            </Text>
            {!isExpanded && shouldTruncate ? (
              <Pressable
                onPress={() => setIsExpanded(true)}
                accessibilityRole="button"
                className="mt-1 active:opacity-[0.92]"
              >
                <Text className="text-sm font-semibold text-primary">
                  View all
                </Text>
              </Pressable>
            ) : null}

            <View className="mt-6">
              <ServiceInfoRow label="Lead by">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={meeting.leadBy.avatar}
                    contentFit="cover"
                    style={{ width: 24, height: 24, borderRadius: 100 }}
                  />
                  <Text className="text-sm font-semibold text-heading">
                    {meeting.leadBy.name}
                  </Text>
                </View>
              </ServiceInfoRow>

              <ServiceInfoRow label="Type">
                <Text className="text-sm font-semibold text-heading">
                  {meeting.meetingType}
                </Text>
              </ServiceInfoRow>

              <ServiceInfoRow label="Location">
                <View className="flex-row items-center gap-1">
                  <MaterialDesignIcons
                    name="map-marker-outline"
                    color={colors.heading}
                    size={14}
                  />
                  <Text className="text-sm font-semibold text-heading">
                    {meeting.location}
                  </Text>
                </View>
              </ServiceInfoRow>

              <ServiceInfoRow label="Status">
                <View
                  className={`rounded-full px-3 py-1 ${
                    isUpcoming ? "bg-primary-50" : "bg-slate-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isUpcoming ? "text-primary" : "text-slate-500"
                    }`}
                  >
                    {meeting.status}
                  </Text>
                </View>
              </ServiceInfoRow>
            </View>

            <ScheduleCard label="Date" value={meeting.date} icon="calendar" />
            <ScheduleCard label="Time" value={meeting.time} icon="clock" />
          </>
        ) : (
          <>
            <View className="mb-3 flex-row items-start justify-between gap-3">
              <Text className="flex-1 text-xl font-bold text-heading">
                {meeting.title}
              </Text>
              <View className="rounded-full bg-primary-50 px-3 py-1">
                <Text className="text-xs font-semibold text-primary">
                  {meeting.category}
                </Text>
              </View>
            </View>

            <Text className="text-sm leading-5 text-slate-500">
              {meeting.body}
            </Text>

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
                    color={liked ? colors.primary : colors.secText}
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
                  <Text className="text-sm text-sec-text">
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
                  color={colors.secText}
                  size={18}
                />
                <Text className="text-sm text-sec-text">
                  {meeting.commentsCount.toLocaleString()} Comments
                </Text>
              </Pressable>

              <View className="flex-row items-center gap-1.5">
                <MaterialDesignIcons
                  name="eye-outline"
                  color={colors.secText}
                  size={18}
                />
                <Text className="text-sm text-sec-text">
                  {meeting.viewsCount.toLocaleString()} Views
                </Text>
              </View>
            </View>

            <Text className="mb-3 mt-6 text-base font-bold text-heading">
              Meeting information
            </Text>

            <View className="rounded-2xl border border-card-border bg-white">
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
          </>
        )}

        <Text className="mb-3 mt-6 text-base font-bold text-heading">
          {isService ? "Participants" : "Attendees"}
        </Text>

        <View className="mb-4 flex-row border-b border-card-border">
          <Pressable
            onPress={() => setActiveTab("team")}
            accessibilityRole="button"
            className={`mr-6 pb-3 active:opacity-[0.92] ${
              activeTab === "team" ? "border-b-2 border-primary" : ""
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === "team" ? "text-primary" : "text-sec-text"
              }`}
            >
              Mojtama Team ({teamAttendees.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("residents")}
            accessibilityRole="button"
            className={`pb-3 active:opacity-[0.92] ${
              activeTab === "residents" ? "border-b-2 border-primary" : ""
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === "residents" ? "text-primary" : "text-sec-text"
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

        {!isService ? (
          <>
            <Text className="mb-3 mt-2 text-base font-bold text-heading">
              Agenda
            </Text>

            <View className="rounded-2xl border border-card-border bg-white px-4 py-4">
              {meeting.agendaItems.map((item, index) => (
                <View key={item.id} className="flex-row">
                  <View className="mr-3 items-center">
                    <View className="size-3 rounded-full bg-primary" />
                    {index < meeting.agendaItems.length - 1 ? (
                      <View className="my-1 w-px flex-1 bg-slate-200" />
                    ) : null}
                  </View>

                  <View
                    className={`flex-1 ${index < meeting.agendaItems.length - 1 ? "pb-5" : ""}`}
                  >
                    <Text className="text-base font-semibold text-heading">
                      {item.title}
                    </Text>
                    <Text className="mt-0.5 text-sm text-sec-text">
                      {item.timeRange}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>

      {(!isService || isUpcoming) && (
        <View className="flex-row gap-3 border-t border-card-border px-4 py-4">
          <Pressable
            onPress={() => console.log("accept meeting:", meeting.id)}
            accessibilityRole="button"
            className="flex-1 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-white">Accept</Text>
          </Pressable>

          <Pressable
            onPress={() => console.log("decline meeting:", meeting.id)}
            accessibilityRole="button"
            className="flex-1 items-center justify-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-heading">Decline</Text>
          </Pressable>
        </View>
      )}

      {!isService ? (
        <>
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
        </>
      ) : null}
    </SafeAreaView>
  );
}
