import { colors } from "@/theme/colors";
import type { ImageSourcePropType } from "react-native";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

type ProfileAvatarProps = {
  avatar: ImageSourcePropType;
  onEditPress?: () => void;
};

export default function ProfileAvatar({
  avatar,
  onEditPress,
}: ProfileAvatarProps) {
  return (
    <View className="relative self-center">
      <Image
        source={avatar}
        contentFit="cover"
        style={{ width: 96, height: 96, borderRadius: 100 }}
      />

      <Pressable
        onPress={onEditPress}
        accessibilityRole="button"
        accessibilityLabel="Edit profile photo"
        className="absolute bottom-0 right-0 size-8 items-center justify-center rounded-full bg-primary active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="camera-outline" color={colors.white} size={16} />
      </Pressable>
    </View>
  );
}
