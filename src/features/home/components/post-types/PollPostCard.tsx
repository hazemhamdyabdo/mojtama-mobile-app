import {
  PostCardHeader,
  PostCardShell,
} from "@/features/home/components/post-types/PostCardShared";
import type { PollPost } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

const MAX_VISIBLE_OPTIONS = 3;

type PollPostCardProps = {
  post: PollPost;
  onPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function PollPostCard({
  post,
  onPress,
  onMenuPress,
  onCommentsPress,
}: PollPostCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(post.options[0]?.id);
  const [liked, setLiked] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);

  const hiddenOptionsCount = Math.max(0, post.options.length - MAX_VISIBLE_OPTIONS);

  const visibleOptions = useMemo(() => {
    if (showAllOptions || hiddenOptionsCount === 0) {
      return post.options;
    }

    return post.options.slice(0, MAX_VISIBLE_OPTIONS);
  }, [hiddenOptionsCount, post.options, showAllOptions]);

  return (
    <PostCardShell onPress={() => onPress?.(post.id)}>
      <PostCardHeader
        authorName={post.authorName}
        authorAvatar={post.authorAvatar}
        timestamp={post.timestamp}
        onMenuPress={() => onMenuPress?.(post.id)}
      />

      <Text className="mb-2 text-lg font-bold text-[#1F1F1F]">
        {post.title}
      </Text>

      <Text numberOfLines={2} className="mb-4 text-sm leading-5 text-[#64748B]">
        {post.body}
      </Text>

      <View className="gap-2">
        {visibleOptions.map((option) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <Pressable
              key={option.id}
              onPress={() => setSelectedOptionId(option.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              className={`flex-row items-center justify-between rounded-xl border px-4 py-3 active:opacity-[0.92] ${
                isSelected
                  ? "border-[#7B61FF] bg-[#FAFAFF]"
                  : "border-[#E4E4E7] bg-white"
              }`}
            >
              <View className="mr-3 flex-1 flex-row items-center gap-3">
                <View
                  className={`size-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-[#7B61FF]" : "border-[#CBD5E1]"
                  }`}
                >
                  {isSelected ? (
                    <View className="size-2.5 rounded-full bg-[#7B61FF]" />
                  ) : null}
                </View>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-base font-semibold text-[#1F1F1F]"
                >
                  {option.label}
                </Text>
              </View>

              <Text className="text-sm font-medium text-[#7B61FF]">
                {option.votes} Vote
              </Text>
            </Pressable>
          );
        })}
      </View>

      {hiddenOptionsCount > 0 ? (
        <Pressable
          onPress={() => setShowAllOptions((prev) => !prev)}
          accessibilityRole="button"
          className="mt-2 self-start active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-[#7B61FF]">
            {showAllOptions
              ? "Show less"
              : `+ ${hiddenOptionsCount} more option${hiddenOptionsCount === 1 ? "" : "s"}`}
          </Text>
        </Pressable>
      ) : null}

      <View className="mt-4 flex-row items-center gap-5">
        <Pressable
          onPress={() => setLiked((prev) => !prev)}
          accessibilityRole="button"
          accessibilityLabel={liked ? "Unlike post" : "Like post"}
          hitSlop={8}
          className="flex-row items-center gap-1.5 active:opacity-[0.92]"
        >
          <MaterialDesignIcons
            name={liked ? "thumb-up" : "thumb-up-outline"}
            color="#7B61FF"
            size={18}
          />
          <Text className="text-sm font-medium text-[#7B61FF]">Like</Text>
        </Pressable>

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
    </PostCardShell>
  );
}
