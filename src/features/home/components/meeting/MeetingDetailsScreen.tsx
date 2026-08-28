import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CommentsBottomSheet, {
  type CommentsBottomSheetRef,
} from "@/features/home/components/CommentsBottomSheet";
import LikesBottomSheet, {
  type LikesBottomSheetRef,
} from "@/features/home/components/LikesBottomSheet";
import AttendeeRow from "@/features/home/components/meeting/AttendeeRow";
import MeetingInfoRow from "@/features/home/components/meeting/MeetingInfoRow";
import MeetingScheduleCard from "@/features/home/components/meeting/MeetingScheduleCard";
import MeetingServiceInfoRow from "@/features/home/components/meeting/MeetingServiceInfoRow";
import PostActionsBottomSheet, {
  type PostActionsBottomSheetRef,
} from "@/features/home/components/PostActionsBottomSheet";
import {
  addComment,
  deletePost,
  getComments,
  getLikes,
  markPostAsUrgent,
  movePostToDraft,
} from "@/features/home/api";
import { usePostById } from "@/features/home/hooks/usePostsState";
import { isMeetingPost } from "@/features/home/utils/buildPostFromForm";
import { respondToMeeting } from "@/features/meetings/api";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

type AttendeeTab = "team" | "residents";

type MeetingDetailsScreenProps = {
  variant?: "feed" | "service";
};

export default function MeetingDetailsScreen({
  variant = "feed",
}: MeetingDetailsScreenProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const meetingId = Array.isArray(id) ? id[0] : id;
  const post = usePostById(meetingId);
  const meeting = post && isMeetingPost(post) ? post : undefined;
  const [liked, setLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<AttendeeTab>("residents");
  const [activeComments, setActiveComments] = useState<
    Awaited<ReturnType<typeof getComments>>
  >([]);
  const [activeLikes, setActiveLikes] = useState<
    Awaited<ReturnType<typeof getLikes>>
  >([]);

  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);
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
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="relative mx-4 mb-4 mt-2 flex-row items-center justify-center">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
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
          {isService
            ? t("home.meeting.details.serviceTitle")
            : t("home.meeting.details.title")}
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
                  {t("common.viewAll")}
                </Text>
              </Pressable>
            ) : null}

            <View className="mt-6">
              <MeetingServiceInfoRow label={t("home.meeting.details.fields.leadBy")}>
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
              </MeetingServiceInfoRow>

              <MeetingServiceInfoRow label={t("common.type")}>
                <Text className="text-sm font-semibold text-heading">
                  {meeting.meetingType}
                </Text>
              </MeetingServiceInfoRow>

              <MeetingServiceInfoRow label={t("common.location")}>
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
              </MeetingServiceInfoRow>

              <MeetingServiceInfoRow label={t("home.meeting.details.fields.status")}>
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
              </MeetingServiceInfoRow>
            </View>

            <MeetingScheduleCard
              label={t("home.meeting.details.fields.date")}
              value={meeting.date}
              icon="calendar"
            />
            <MeetingScheduleCard
              label={t("home.meeting.details.fields.time")}
              value={meeting.time}
              icon="clock"
            />
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
                  accessibilityLabel={t("home.engagement.like")}
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
                  accessibilityLabel={t("home.postDetails.likes", {
                    count: displayedLikes,
                  })}
                  hitSlop={8}
                  className="active:opacity-[0.92]"
                >
                  <Text className="text-sm text-sec-text">
                    {t("home.postDetails.likes", { count: displayedLikes })}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => commentsSheetRef.current?.open(meeting.id)}
                accessibilityRole="button"
                accessibilityLabel={t("home.postDetails.comments", {
                  count: meeting.commentsCount,
                })}
                hitSlop={8}
                className="flex-row items-center gap-1.5 active:opacity-[0.92]"
              >
                <MaterialDesignIcons
                  name="comment-outline"
                  color={colors.secText}
                  size={18}
                />
                <Text className="text-sm text-sec-text">
                  {t("home.postDetails.comments", {
                    count: meeting.commentsCount,
                  })}
                </Text>
              </Pressable>

              <View className="flex-row items-center gap-1.5">
                <MaterialDesignIcons
                  name="eye-outline"
                  color={colors.secText}
                  size={18}
                />
                <Text className="text-sm text-sec-text">
                  {t("home.postDetails.views", { count: meeting.viewsCount })}
                </Text>
              </View>
            </View>

            <Text className="mb-3 mt-6 text-base font-bold text-heading">
              {t("home.meeting.details.infoSection")}
            </Text>

            <View className="rounded-2xl border border-card-border bg-white">
              <MeetingInfoRow
                label={t("home.meeting.details.fields.agenda")}
                value={meeting.agenda}
              />
              <MeetingInfoRow
                label={t("home.meeting.details.fields.date")}
                value={meeting.date}
              />
              <MeetingInfoRow
                label={t("home.meeting.details.fields.time")}
                value={meeting.time}
                accent={meeting.duration}
              />
              <MeetingInfoRow
                label={t("home.meeting.details.fields.location")}
                value={meeting.location}
              />
              {meeting.meetingLink ? (
                <MeetingInfoRow
                  label={t("home.meeting.details.fields.meetingLink")}
                  value={meeting.meetingLink}
                />
              ) : null}
              <MeetingInfoRow
                label={t("home.meeting.details.fields.createdBy")}
                value={meeting.createdBy}
              />
              <MeetingInfoRow
                label={t("home.meeting.details.fields.ledBy")}
                value={meeting.leadBy.name}
              />
              <MeetingInfoRow
                label={t("home.meeting.details.fields.visibility")}
                value={meeting.visibility}
                accent={meeting.isPublic ? t("home.visibility.public") : undefined}
              />
            </View>
          </>
        )}

        <Text className="mb-3 mt-6 text-base font-bold text-heading">
          {isService
            ? t("home.meeting.details.participants")
            : t("home.meeting.details.attendees")}
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
              {t("home.meeting.details.team", { count: teamAttendees.length })}
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
              {t("home.meeting.details.residents", {
                count: residentAttendees.length,
              })}
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
              {t("home.meeting.details.agendaSection")}
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
            onPress={() => void respondToMeeting(meeting.id, "attending")}
            accessibilityRole="button"
            className="flex-1 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-white">
              {t("home.meeting.actions.accept")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => void respondToMeeting(meeting.id, "declined")}
            accessibilityRole="button"
            className="flex-1 items-center justify-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-heading">
              {t("home.meeting.actions.decline")}
            </Text>
          </Pressable>
        </View>
      )}

      {!isService ? (
        <>
          <LikesBottomSheet ref={likesSheetRef} likes={activeLikes} />

          <CommentsBottomSheet
            ref={commentsSheetRef}
            comments={activeComments}
            onSendComment={(commentPostId, text) => {
              void addComment(commentPostId, text).then((comment) => {
                setActiveComments((current) => [comment, ...current]);
              });
            }}
          />

          <PostActionsBottomSheet
            ref={postActionsSheetRef}
            onMoveToDraft={(commentPostId) => void movePostToDraft(commentPostId)}
            onEditPost={(commentPostId) =>
              router.push(`/meeting/${commentPostId}`)
            }
            onMarkAsUrgent={(commentPostId, isUrgent) =>
              void markPostAsUrgent(commentPostId, isUrgent)
            }
            onDeletePost={(commentPostId) => {
              void deletePost(commentPostId).then(() => router.back());
            }}
          />
        </>
      ) : null}
    </ScreenSafeAreaView>
  );
}
