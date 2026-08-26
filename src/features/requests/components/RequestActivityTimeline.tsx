import RequestStatusBadge from "@/features/requests/components/RequestStatusBadge";
import type { RequestActivity } from "@/features/requests/types";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Text, View } from "react-native";

type RequestActivityTimelineProps = {
  activities: RequestActivity[];
};

function sortActivitiesNewestFirst(
  activities: RequestActivity[],
): RequestActivity[] {
  return [...activities].sort((a, b) => b.occurredAt - a.occurredAt);
}

type ActivityAvatarProps = {
  activity: RequestActivity;
};

function ActivityAvatar({ activity }: ActivityAvatarProps) {
  if (activity.actorAvatar) {
    return (
      <Image
        source={activity.actorAvatar}
        contentFit="cover"
        style={{ width: 36, height: 36, borderRadius: 100 }}
      />
    );
  }

  return (
    <View className="size-9 items-center justify-center rounded-full bg-[#F0EDFF]">
      <Text className="text-xs font-semibold text-[#7B61FF]">
        {activity.actor.charAt(0)}
      </Text>
    </View>
  );
}

export default function RequestActivityTimeline({
  activities,
}: RequestActivityTimelineProps) {
  const sortedActivities = useMemo(
    () => sortActivitiesNewestFirst(activities),
    [activities],
  );

  if (sortedActivities.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <Text className="mb-4 border-t border-gray-200 pt-4 text-sm font-semibold text-[#90A1B9]">
        Latest Activities
      </Text>

      <View>
        {sortedActivities.map((activity, index) => {
          const isLast = index === sortedActivities.length - 1;

          return (
            <View key={activity.id} className="flex-row gap-3">
              <View className="w-9 items-center">
                <ActivityAvatar activity={activity} />
                {!isLast ? (
                  <View className="my-1 w-px flex-1 bg-[#E4E4E7]" />
                ) : null}
              </View>

              <View className={`flex-1 ${isLast ? "" : "pb-4"}`}>
                <Text className="text-sm font-semibold text-[#1F1F1F]">
                  {activity.title}
                </Text>
                <Text className="mt-0.5 text-xs text-[#90A1B9]">
                  By {activity.actor} • {activity.timestamp}
                </Text>

                {activity.fromStatus && activity.toStatus ? (
                  <View className="mt-2 flex-row items-center gap-2">
                    <RequestStatusBadge status={activity.fromStatus} />
                    <Text className="text-[#90A1B9]">→</Text>
                    <RequestStatusBadge status={activity.toStatus} />
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
