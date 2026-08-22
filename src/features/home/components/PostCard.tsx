import type { Post } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type PostCardProps = {
  post: Post;
  onPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onLikesPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function PostCard({
  post,
  onPress,
  onMenuPress,
  onLikesPress,
  onCommentsPress,
}: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const displayedLikes = post.likesCount + (liked ? 1 : 0);

  return (
    <Pressable
      onPress={() => onPress?.(post.id)}
      accessibilityRole="button"
      className="rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.96]"
    >
      <View className="mb-3 flex-row items-center">
        <Image
          source={post.authorAvatar}
          contentFit="cover"
          style={{ width: 40, height: 40 }}
          className=" rounded-full"
        />

        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-[#1F1F1F]">
            {post.authorName}
          </Text>
          <Text className="text-sm text-[#90A1B9]">{post.timestamp}</Text>
        </View>

        <Pressable
          onPress={() => onMenuPress?.(post.id)}
          accessibilityRole="button"
          accessibilityLabel="Post options"
          hitSlop={8}
          className="active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="dots-vertical" color="#90A1B9" size={22} />
        </Pressable>
      </View>

      {post.image ? (
        <Image
          source={post.image}
          contentFit="cover"
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      ) : null}

      <Text className="mb-2 text-lg font-bold text-[#1F1F1F]">
        {post.title}
      </Text>

      <Text
        numberOfLines={expanded ? undefined : 3}
        className="text-sm leading-5 text-[#64748B]"
      >
        {post.body}
      </Text>

      {!expanded ? (
        <Pressable
          onPress={() => setExpanded(true)}
          accessibilityRole="button"
          className="mt-1 self-start active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-[#7B61FF]">Read more</Text>
        </Pressable>
      ) : null}

      <View className="mt-4 flex-row items-center gap-5">
        <View className="flex-row items-center gap-1.5">
          <Pressable
            onPress={() => setLiked((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel={liked ? "Unlike post" : "Like post"}
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
            onPress={() => onLikesPress?.(post.id)}
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
          onPress={() => onCommentsPress?.(post.id)}
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
            {post.commentsCount.toLocaleString()} Comments
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
