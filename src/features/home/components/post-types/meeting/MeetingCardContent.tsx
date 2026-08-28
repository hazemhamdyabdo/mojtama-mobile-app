import MeetingDetailRow from "@/features/home/components/post-types/meeting/MeetingDetailRow";
import MeetingInfoBlock from "@/features/home/components/post-types/meeting/MeetingInfoBlock";
import type { MeetingPost } from "@/features/home/types";
import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type MeetingCardContentProps = {
  post: MeetingPost;
};

export default function MeetingCardContent({ post }: MeetingCardContentProps) {
  return (
    <>
      <View className="mb-3 flex-row items-start justify-between">
        <Text className="flex-1 text-lg font-bold text-heading">
          {post.title}
        </Text>
        <View
          className={`rounded-full px-3 py-1 ${
            post.status.toLowerCase() === "upcoming"
              ? "bg-primary-50"
              : "bg-slate-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              post.status.toLowerCase() === "upcoming"
                ? "text-primary"
                : "text-slate-500"
            }`}
          >
            {post.status}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-sm leading-5 text-slate-500">{post.body}</Text>

      <MeetingDetailRow label="Lead by">
        <View className="flex-row items-center gap-2">
          <Image
            source={post.leadBy.avatar}
            contentFit="cover"
            style={{ width: 24, height: 24, borderRadius: 100 }}
          />
          <Text className="text-sm font-medium text-heading">
            {post.leadBy.name}
          </Text>
        </View>
      </MeetingDetailRow>

      <MeetingDetailRow label="Type">
        <Text className="text-sm font-medium text-heading">
          {post.meetingType}
        </Text>
      </MeetingDetailRow>

      <MeetingDetailRow label="Location">
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="map-marker-outline"
            color={colors.slate500}
            size={16}
          />
          <Text className="text-sm font-medium text-heading">
            {post.location}
          </Text>
        </View>
      </MeetingDetailRow>

      <View className="mt-2">
        <MeetingInfoBlock label="Date" value={post.date} icon="calendar" />
        <MeetingInfoBlock label="Time" value={post.time} icon="clock" />
      </View>
    </>
  );
}
