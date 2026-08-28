import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type PostEngagementFooterProps = {
  likesCount: number;
  commentsCount: number;
  liked: boolean;
  onLikePress: () => void;
  onLikesPress?: () => void;
  onCommentsPress?: () => void;
};

export default function PostEngagementFooter({
  likesCount,
  commentsCount,
  liked,
  onLikePress,
  onLikesPress,
  onCommentsPress,
}: PostEngagementFooterProps) {
  const { t } = useTranslation();

  return (
    <View className="mt-4 flex-row items-center gap-5">
      <View className="flex-row items-center gap-1.5">
        <Pressable
          onPress={onLikePress}
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
          onPress={onLikesPress}
          accessibilityRole="button"
          accessibilityLabel={t("home.postDetails.likes", { count: likesCount })}
          hitSlop={8}
          className="active:opacity-[0.92]"
        >
          <Text className="text-sm text-sec-text">
            {t("home.postDetails.likes", { count: likesCount })}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onCommentsPress}
        accessibilityRole="button"
        accessibilityLabel={t("home.postDetails.comments", {
          count: commentsCount,
        })}
        hitSlop={8}
        className="flex-row items-center gap-1.5 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="comment-outline" color={colors.secText} size={18} />
        <Text className="text-sm text-sec-text">
          {t("home.postDetails.comments", { count: commentsCount })}
        </Text>
      </Pressable>
    </View>
  );
}
