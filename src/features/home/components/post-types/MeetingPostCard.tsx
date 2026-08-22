import { PostCardShell } from "@/features/home/components/post-types/PostCardShared";
import type { MeetingPost } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

type MeetingPostCardProps = {
  post: MeetingPost;
  onPress?: (postId: string) => void;
};

type DetailRowProps = {
  label: string;
  children: ReactNode;
};

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-sm text-[#90A1B9]">{label}</Text>
      {children}
    </View>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
  icon: "calendar" | "clock";
};

function InfoBlock({ label, value, icon }: InfoBlockProps) {
  return (
    <View className="mb-2 flex-row items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
      <Text className="text-sm text-[#90A1B9]">{label}</Text>
      <View className="flex-row items-center gap-2">
        <MaterialDesignIcons
          name={
            icon === "calendar" ? "calendar-blank-outline" : "clock-outline"
          }
          color="#64748B"
          size={18}
        />
        <Text className="text-sm font-medium text-[#64748B]">{value}</Text>
      </View>
    </View>
  );
}

export default function MeetingPostCard({
  post,
  onPress,
}: MeetingPostCardProps) {
  return (
    <PostCardShell onPress={() => onPress?.(post.id)}>
      <View className="mb-3 flex-row items-start justify-between">
        <Text className="flex-1 text-lg font-bold text-[#1F1F1F]">
          {post.title}
        </Text>
        <View className="rounded-full bg-[#F0EDFF] px-3 py-1">
          <Text className="text-xs font-semibold text-[#7B61FF]">
            {post.status}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-sm leading-5 text-[#64748B]">{post.body}</Text>

      <DetailRow label="Lead by">
        <View className="flex-row items-center gap-2">
          <Image
            source={post.leadBy.avatar}
            contentFit="cover"
            style={{ width: 24, height: 24, borderRadius: 100 }}
          />
          <Text className="text-sm font-medium text-[#1F1F1F]">
            {post.leadBy.name}
          </Text>
        </View>
      </DetailRow>

      <DetailRow label="Type">
        <Text className="text-sm font-medium text-[#1F1F1F]">
          {post.meetingType}
        </Text>
      </DetailRow>

      <DetailRow label="Location">
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="map-marker-outline"
            color="#64748B"
            size={16}
          />
          <Text className="text-sm font-medium text-[#1F1F1F]">
            {post.location}
          </Text>
        </View>
      </DetailRow>

      <View className="mt-2">
        <InfoBlock label="Date" value={post.date} icon="calendar" />
        <InfoBlock label="Time" value={post.time} icon="clock" />
      </View>
    </PostCardShell>
  );
}
