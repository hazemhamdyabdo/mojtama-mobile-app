import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import type { ReactNode } from "react";
import type { ImageSourcePropType } from "react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";

type PostCardShellProps = ViewProps & {
  onPress?: () => void;
  children: ReactNode;
};

export function PostCardShell({ onPress, children, ...props }: PostCardShellProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="rounded-2xl border border-card-border bg-white p-4 active:opacity-[0.96]"
      {...props}
    >
      {children}
    </Pressable>
  );
}

type PostCardHeaderProps = {
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  onMenuPress?: () => void;
};

export function PostCardHeader({
  authorName,
  authorAvatar,
  timestamp,
  onMenuPress,
}: PostCardHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center">
      <Image
        source={authorAvatar}
        contentFit="cover"
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />

      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-heading">{authorName}</Text>
        <Text className="text-sm text-sec-text">{timestamp}</Text>
      </View>

      {onMenuPress ? (
        <Pressable
          onPress={onMenuPress}
          accessibilityRole="button"
          accessibilityLabel="Post options"
          hitSlop={8}
          className="active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="dots-vertical" color={colors.secText} size={22} />
        </Pressable>
      ) : null}
    </View>
  );
}

type PostEngagementFooterProps = {
  likesCount: number;
  commentsCount: number;
  liked: boolean;
  onLikePress: () => void;
  onLikesPress?: () => void;
  onCommentsPress?: () => void;
};

export function PostEngagementFooter({
  likesCount,
  commentsCount,
  liked,
  onLikePress,
  onLikesPress,
  onCommentsPress,
}: PostEngagementFooterProps) {
  return (
    <View className="mt-4 flex-row items-center gap-5">
      <View className="flex-row items-center gap-1.5">
        <Pressable
          onPress={onLikePress}
          accessibilityRole="button"
          accessibilityLabel={liked ? "Unlike post" : "Like post"}
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
          onPress={onLikesPress}
          accessibilityRole="button"
          accessibilityLabel="View likes"
          hitSlop={8}
          className="active:opacity-[0.92]"
        >
          <Text className="text-sm text-sec-text">
            {likesCount.toLocaleString()} Likes
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onCommentsPress}
        accessibilityRole="button"
        accessibilityLabel="View comments"
        hitSlop={8}
        className="flex-row items-center gap-1.5 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="comment-outline" color={colors.secText} size={18} />
        <Text className="text-sm text-sec-text">
          {commentsCount.toLocaleString()} Comments
        </Text>
      </Pressable>
    </View>
  );
}

type ExpandableBodyProps = {
  title: string;
  body: string;
  expanded: boolean;
  onExpand: () => void;
  showImage?: ImageSourcePropType;
};

export function ExpandablePostBody({
  title,
  body,
  expanded,
  onExpand,
  showImage,
}: ExpandableBodyProps) {
  return (
    <>
      {showImage ? (
        <Image
          source={showImage}
          contentFit="cover"
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      ) : null}

      <Text className="mb-2 text-lg font-bold text-heading">{title}</Text>

      <Text
        numberOfLines={expanded ? undefined : 3}
        className="text-sm leading-5 text-slate-500"
      >
        {body}
      </Text>

      {!expanded ? (
        <Pressable
          onPress={onExpand}
          accessibilityRole="button"
          className="mt-1 self-start active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-primary">Read more</Text>
        </Pressable>
      ) : null}
    </>
  );
}
