import { colors } from "@/theme/colors";
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
    <View className="w-[47.5%] rounded-2xl border border-card-border bg-white p-4">
      <View className="size-10 items-center justify-center rounded-full bg-primary-50">
        <MaterialDesignIcons name={metric.icon} color={colors.primary} size={20} />
      </View>
      <Text className="mt-3 text-sm text-sec-text">{metric.label}</Text>
      <Text className="mt-1 text-xl font-bold text-heading">
        {metric.value}
      </Text>
    </View>
  );
}
