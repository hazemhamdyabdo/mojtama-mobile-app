import { colors } from "@/theme/colors";
import { Image } from "expo-image";
import { View } from "react-native";

const aiAvatar = require("@/assets/images/auth/mojtama-logo.png");

type AiAvatarProps = {
  size?: number;
};

export default function AiAvatar({ size = 36 }: AiAvatarProps) {
  return (
    <View
      className="items-center justify-center rounded-full bg-primary-50"
      style={{ width: size, height: size }}
    >
      <Image
        source={aiAvatar}
        contentFit="contain"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          tintColor: colors.primary,
        }}
      />
    </View>
  );
}
