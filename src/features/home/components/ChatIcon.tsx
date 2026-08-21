import { Image } from "expo-image";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChatIconProps = {
  onPress?: () => void;
};

const chatIconSource = require("@/features/home/constants/chat-action-icon.png");

export default function ChatIcon({ onPress }: ChatIconProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Open chat"
      style={{ bottom: insets.bottom - 10 }}
      className="absolute right-4 z-10 size-14  items-center justify-center rounded-full bg-[#7B61FF] shadow-md active:opacity-[0.92]"
    >
      <Image
        source={chatIconSource}
        style={{ width: "100%", height: "100%" }}
      />
    </Pressable>
  );
}
