import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type UserAttachmentBubbleProps = {
  uri: string;
  fileName?: string;
  time: string;
};

export default function UserAttachmentBubble({
  uri,
  fileName,
  time,
}: UserAttachmentBubbleProps) {
  return (
    <View className="mb-4 max-w-[72%] self-end overflow-hidden rounded-2xl rounded-br-md bg-primary-50">
      <Image
        source={{ uri }}
        contentFit="cover"
        style={{ width: "auto", height: 180 }}
      />
      {fileName ? (
        <Text numberOfLines={1} className="px-3 py-2 text-xs text-slate-500">
          {fileName}
        </Text>
      ) : null}
      <View className="flex-row items-center justify-end gap-1 px-3 pb-2">
        <Text className="text-xs text-sec-text">{time}</Text>
        <MaterialDesignIcons name="check-all" color={colors.primary} size={14} />
      </View>
    </View>
  );
}
