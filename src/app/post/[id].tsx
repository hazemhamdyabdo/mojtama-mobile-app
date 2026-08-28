import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
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
import type { Post } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

type InfoRowProps = {
  label: string;
  value: string;
  isChip?: boolean;
};

function InfoRow({ label, value, isChip = false }: InfoRowProps) {
  return (
    <View className="flex-row items-center justify-between px-4 py-2">
      <Text className="text-base text-slate-500">{label}</Text>
      {isChip ? (
        <View className="rounded-full bg-primary-50 px-4 py-1.5">
          <Text className="text-sm font-medium text-primary">{value}</Text>
        </View>
      ) : (
        <Text className="text-base font-medium text-heading">{value}</Text>
      )}
    </View>
  );
}

function getPostedBy(post: Post) {
  switch (post.type) {
    case "announcements":
    case "news":
    case "poll":
      return post.authorName;
    case "meeting":
      return post.leadBy.name;
    default: {
      const exhaustive: never = post;
      return exhaustive;
    }
  }
}

export default function PostDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);

  const post = DUMMY_POSTS.find((item) => item.id === id) ?? DUMMY_POSTS[0];

  if (post.type === "meeting") {
    return <Redirect href={`/meeting/${post.id}` as Href} />;
  }

  const displayedLikes = post.likesCount + (liked ? 1 : 0);

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
          {t("home.postDetails.title")}
        </Text>

        <Pressable
          onPress={() => postActionsSheetRef.current?.open(post.id)}
          accessibilityRole="button"
          accessibilityLabel={t("home.a11y.postOptions")}
          hitSlop={8}
          className="absolute right-0 active:opacity-[0.92]"
        >
          <MaterialDesignIcons
            name="dots-vertical"
            color={colors.heading}
            size={24}
          />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {post.type === "news" ? (
          <Image
            source={post.image}
            contentFit="cover"
            style={{
              width: "100%",
              height: 180,
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
        ) : null}

        <Text className="mb-2 text-xl font-bold text-heading">
          {post.title}
        </Text>

        <Text
          numberOfLines={expanded ? undefined : 3}
          className="text-sm leading-5 text-slate-500"
        >
          {post.body}
        </Text>

        {!expanded ? (
          <Pressable
            onPress={() => setExpanded(true)}
            accessibilityRole="button"
            className="mt-1 self-start active:opacity-[0.92]"
          >
            <Text className="text-sm font-medium text-primary">
              {t("common.readMore")}
            </Text>
          </Pressable>
        ) : null}

        {post.type === "poll" ? (
          <View className="mt-4 gap-2">
            {post.options.map((option) => (
              <View
                key={option.id}
                className="flex-row items-center justify-between rounded-xl border border-card-border px-4 py-3"
              >
                <Text className="text-base font-semibold text-heading">
                  {option.label}
                </Text>
                <Text className="text-sm font-medium text-primary">
                  {t("home.postDetails.vote", { count: option.votes })}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View className="mt-4 flex-row items-center gap-5">
          <View className="flex-row items-center gap-1.5">
            <Pressable
              onPress={() => setLiked((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                liked ? t("home.a11y.unlikePost") : t("home.a11y.likePost")
              }
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
              onPress={() => likesSheetRef.current?.open(post.id)}
              accessibilityRole="button"
              accessibilityLabel={t("home.a11y.viewLikes")}
              hitSlop={8}
              className="active:opacity-[0.92]"
            >
              <Text className="text-sm text-sec-text">
                {t("home.postDetails.likes", { count: displayedLikes })}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => commentsSheetRef.current?.open(post.id)}
            accessibilityRole="button"
            accessibilityLabel={t("home.a11y.viewComments")}
            hitSlop={8}
            className="flex-row items-center gap-1.5 active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name="comment-outline"
              color={colors.secText}
              size={18}
            />
            <Text className="text-sm text-sec-text">
              {t("home.postDetails.comments", { count: post.commentsCount })}
            </Text>
          </Pressable>

          <View className="flex-row items-center gap-1.5">
            <MaterialDesignIcons
              name="eye-outline"
              color={colors.secText}
              size={18}
            />
            <Text className="text-sm text-sec-text">
              {t("home.postDetails.views", { count: post.viewsCount })}
            </Text>
          </View>
        </View>

        <Text className="mb-3 mt-6 text-base font-bold text-heading">
          {t("home.postDetails.infoSection")}
        </Text>

        <View className="rounded-2xl border border-card-border bg-white">
          <InfoRow
            label={t("home.postDetails.category")}
            value={post.category}
            isChip
          />
          <InfoRow
            label={t("home.postDetails.postedBy")}
            value={getPostedBy(post)}
          />
          <InfoRow
            label={t("home.postDetails.postedAt")}
            value={post.postedAt}
          />
          <InfoRow
            label={t("home.postDetails.visibility")}
            value={post.visibility}
          />
        </View>

        <Pressable
          onPress={() => commentsSheetRef.current?.open(post.id)}
          accessibilityRole="button"
          className="mt-6 items-center justify-center rounded-xl border border-primary py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-semibold text-primary">
            {t("home.postDetails.viewComments")}
          </Text>
        </Pressable>
      </ScrollView>

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
    </ScreenSafeAreaView>
  );
}
