import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type UserTextBubbleProps = {
  text: string;
  time: string;
};

export default function UserTextBubble({ text, time }: UserTextBubbleProps) {
  return (
    <View className="mb-4 max-w-[88%] self-end rounded-2xl rounded-br-md bg-primary-50 px-4 py-3">
      <Text className="text-sm leading-5 text-heading">{text}</Text>
      <View className="mt-2 flex-row items-center justify-end gap-1">
        <Text className="text-xs text-sec-text">{time}</Text>
        <MaterialDesignIcons name="check-all" color={colors.primary} size={14} />
      </View>
    </View>
  );
}
