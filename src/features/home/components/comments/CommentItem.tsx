import { colors } from "@/theme/colors";
import type { PostComment } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type CommentItemProps = {
  comment: PostComment;
  isReply?: boolean;
};

export default function CommentItem({
  comment,
  isReply = false,
}: CommentItemProps) {
  const { t } = useTranslation();

  return (
    <View className={isReply ? "ml-6 border-l border-card-border pl-4" : ""}>
      <View className="mb-4">
        <View className="flex-row items-center gap-2">
          {comment.avatar ? (
            <Image
              source={comment.avatar}
              contentFit="cover"
              style={{ width: 32, height: 32, borderRadius: 100 }}
            />
          ) : (
            <View className="size-8 items-center justify-center rounded-full bg-primary-50">
              <Text className="text-xs font-semibold text-primary">
                {comment.authorName[0]}
              </Text>
            </View>
          )}

          <Text className="text-base font-semibold text-heading">
            {comment.authorName}
          </Text>
          <Text className="text-sm text-sec-text">{comment.time}</Text>
        </View>

        <View className="ml-10">
          <Text className="text-sm leading-5 text-slate-500">
            {comment.text}
            <Text className="text-sm font-medium text-primary">
              {" "}
              {t("home.engagement.viewMore")}
            </Text>
          </Text>

          <View className="mt-2 flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <MaterialDesignIcons
                name="thumb-up-outline"
                color={colors.secText}
                size={16}
              />
              <Text className="text-sm text-sec-text">
                {t("home.postDetails.likes", { count: comment.likesCount })}
              </Text>
            </View>
            {!isReply ? (
              <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-1 active:opacity-[0.92]"
              >
                <MaterialDesignIcons
                  name="arrow-right-top"
                  color={colors.primary}
                  size={16}
                />
                <Text className="text-sm font-medium text-primary">
                  {t("home.engagement.reply")}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </View>
  );
}
