import AiAvatar from "@/features/chat/components/AiAvatar";
import { Text, View } from "react-native";

type AiTextBubbleProps = {
  text: string;
  time: string;
};

export default function AiTextBubble({ text, time }: AiTextBubbleProps) {
  return (
    <View className="mb-4 max-w-[88%] flex-row items-start gap-2 self-start">
      <AiAvatar size={32} />
      <View className="flex-1 rounded-2xl rounded-bl-md border border-card-border bg-white px-4 py-3">
        <Text className="text-sm leading-5 text-heading">{text}</Text>
        <Text className="mt-2 self-end text-xs text-sec-text">{time}</Text>
      </View>
    </View>
  );
}
