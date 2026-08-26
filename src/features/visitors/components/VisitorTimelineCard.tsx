import type { VisitorTimelineEvent } from "@/features/visitors/types";
import { Text, View } from "react-native";

type VisitorTimelineCardProps = {
  events: VisitorTimelineEvent[];
};

const DOT_COLORS = ["#7B61FF", "#A78BFA", "#DDD6FE"];

export default function VisitorTimelineCard({
  events,
}: VisitorTimelineCardProps) {
  return (
    <View className="mt-4 rounded-2xl bg-[#F8FAFC] p-4">
      <Text className="mb-3 text-sm font-semibold text-[#1F1F1F]">
        Timeline
      </Text>

      <View className="gap-3">
        {events.map((event, index) => (
          <View
            key={event.id}
            className="flex-row items-center gap-3 rounded-2xl bg-white px-4 py-3"
          >
            <View
              className="size-2.5 rounded-full"
              style={{
                backgroundColor: DOT_COLORS[index % DOT_COLORS.length],
              }}
            />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#1F1F1F]">
                {event.title}
              </Text>
              <Text className="mt-0.5 text-xs text-[#90A1B9]">
                {event.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
