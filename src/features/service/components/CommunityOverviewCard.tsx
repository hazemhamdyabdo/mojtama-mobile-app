import type { CommunityOverviewMetric } from "@/features/service/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type CommunityOverviewCardProps = {
  metric: CommunityOverviewMetric;
};

export default function CommunityOverviewCard({
  metric,
}: CommunityOverviewCardProps) {
  return (
    <View className="w-[47.5%] rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
        <MaterialDesignIcons name={metric.icon} color="#7B61FF" size={20} />
      </View>
      <Text className="mt-3 text-sm text-[#90A1B9]">{metric.label}</Text>
      <Text className="mt-1 text-xl font-bold text-[#1F1F1F]">
        {metric.value}
      </Text>
    </View>
  );
}
