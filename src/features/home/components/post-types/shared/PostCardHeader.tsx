import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { Pressable, Text, View } from "react-native";

type PostCardHeaderProps = {
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  onMenuPress?: () => void;
};

export default function PostCardHeader({
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
