import { colors } from "@/theme/colors";
import type { VisitorTimelineEvent } from "@/features/visitors/types";
import { Text, View } from "react-native";

type VisitorTimelineCardProps = {
  events: VisitorTimelineEvent[];
};

const DOT_COLORS = [colors.primary, colors.primary400, colors.primary200];

export default function VisitorTimelineCard({
  events,
}: VisitorTimelineCardProps) {
  return (
    <View className="mt-4 rounded-2xl bg-slate-50 p-4">
      <Text className="mb-3 text-sm font-semibold text-heading">
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
              <Text className="text-sm font-semibold text-heading">
                {event.title}
              </Text>
              <Text className="mt-0.5 text-xs text-sec-text">
                {event.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
