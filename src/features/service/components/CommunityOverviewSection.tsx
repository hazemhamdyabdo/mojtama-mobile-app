import CommunityOverviewCard from "@/features/service/components/CommunityOverviewCard";
import { ADMIN_OVERVIEW_METRICS } from "@/features/service/constants/dummy";
import { Text, View } from "react-native";

export default function CommunityOverviewSection() {
  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-[#1F1F1F]">
        Community Overview
      </Text>
      <Text className="mt-1 text-sm text-[#90A1B9]">
        Manage and monitor your community
      </Text>

      <View className="mt-4 flex-row flex-wrap justify-between gap-y-3">
        {ADMIN_OVERVIEW_METRICS.map((metric) => (
          <CommunityOverviewCard key={metric.id} metric={metric} />
        ))}
      </View>
    </View>
  );
}
