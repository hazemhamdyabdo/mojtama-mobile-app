import MeetingCardContent from "@/features/home/components/post-types/meeting/MeetingCardContent";
import { PostCardShell } from "@/features/home/components/post-types/shared";
import type { MeetingPost } from "@/features/home/types";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type MeetingPostCardProps = {
  post: MeetingPost;
  onPress?: (postId: string) => void;
  variant?: "feed" | "service";
  onAccept?: () => void;
  onDecline?: () => void;
  onDetailsPress?: () => void;
};

export default function MeetingPostCard({
  post,
  onPress,
  variant = "feed",
  onAccept,
  onDecline,
  onDetailsPress,
}: MeetingPostCardProps) {
  const { t } = useTranslation();
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
              <Text className="text-base font-bold text-white">
                {t("home.meeting.actions.accept")}
              </Text>
            </Pressable>

            <Pressable
              onPress={onDecline}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-heading">
                {t("home.meeting.actions.decline")}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={onDetailsPress}
            accessibilityRole="button"
            className="mt-4 items-center rounded-2xl border border-card-border bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-slate-500">
              {t("home.meeting.actions.details")}
            </Text>
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
