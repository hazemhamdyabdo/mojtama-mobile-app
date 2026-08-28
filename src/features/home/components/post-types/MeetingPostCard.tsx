import { colors } from "@/theme/colors";
import { PostCardShell } from "@/features/home/components/post-types/PostCardShared";
import type { MeetingPost } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type MeetingPostCardProps = {
  post: MeetingPost;
  onPress?: (postId: string) => void;
  variant?: "feed" | "service";
  onAccept?: () => void;
  onDecline?: () => void;
  onDetailsPress?: () => void;
};

type DetailRowProps = {
  label: string;
  children: ReactNode;
};

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-sm text-sec-text">{label}</Text>
      {children}
    </View>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
  icon: "calendar" | "clock";
};

function InfoBlock({ label, value, icon }: InfoBlockProps) {
  return (
    <View className="mb-2 flex-row items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <Text className="text-sm text-sec-text">{label}</Text>
      <View className="flex-row items-center gap-2">
        <MaterialDesignIcons
          name={
            icon === "calendar" ? "calendar-blank-outline" : "clock-outline"
          }
          color={colors.slate500}
          size={18}
        />
        <Text className="text-sm font-medium text-slate-500">{value}</Text>
      </View>
    </View>
  );
}

function MeetingCardContent({ post }: { post: MeetingPost }) {
  return (
    <>
      <View className="mb-3 flex-row items-start justify-between">
        <Text className="flex-1 text-lg font-bold text-heading">
          {post.title}
        </Text>
        <View
          className={`rounded-full px-3 py-1 ${
            post.status.toLowerCase() === "upcoming"
              ? "bg-primary-50"
              : "bg-slate-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              post.status.toLowerCase() === "upcoming"
                ? "text-primary"
                : "text-slate-500"
            }`}
          >
            {post.status}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-sm leading-5 text-slate-500">{post.body}</Text>

      <DetailRow label="Lead by">
        <View className="flex-row items-center gap-2">
          <Image
            source={post.leadBy.avatar}
            contentFit="cover"
            style={{ width: 24, height: 24, borderRadius: 100 }}
          />
          <Text className="text-sm font-medium text-heading">
            {post.leadBy.name}
          </Text>
        </View>
      </DetailRow>

      <DetailRow label="Type">
        <Text className="text-sm font-medium text-heading">
          {post.meetingType}
        </Text>
      </DetailRow>

      <DetailRow label="Location">
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="map-marker-outline"
            color={colors.slate500}
            size={16}
          />
          <Text className="text-sm font-medium text-heading">
            {post.location}
          </Text>
        </View>
      </DetailRow>

      <View className="mt-2">
        <InfoBlock label="Date" value={post.date} icon="calendar" />
        <InfoBlock label="Time" value={post.time} icon="clock" />
      </View>
    </>
  );
}

export default function MeetingPostCard({
  post,
  onPress,
  variant = "feed",
  onAccept,
  onDecline,
  onDetailsPress,
}: MeetingPostCardProps) {
  const isUpcoming = post.status.toLowerCase() === "upcoming";

  if (variant === "service") {
    return (
      <View className="mb-4 rounded-2xl border border-card-border bg-white p-4">
        <MeetingCardContent post={post} />

        {isUpcoming ? (
          <View className="mt-4 flex-row gap-3">
            <Pressable
              onPress={onAccept}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">Accept</Text>
            </Pressable>

            <Pressable
              onPress={onDecline}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-heading">Decline</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={onDetailsPress}
            accessibilityRole="button"
            className="mt-4 items-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-slate-500">Details</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <PostCardShell onPress={() => onPress?.(post.id)}>
      <MeetingCardContent post={post} />
    </PostCardShell>
  );
}
