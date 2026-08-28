import { colors } from "@/theme/colors";
import type { CommunityOverviewMetric } from "@/features/service/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const METRIC_I18N_KEYS: Record<string, string> = {
  "total-meetings": "totalMeetings",
  "total-members": "totalMembers",
  "upcoming-meetings": "upcomingMeetings",
  "help-desk": "helpDesk",
  "all-visitor": "allVisitor",
  announcements: "announcements",
  "overdue-bills": "overdueBills",
};

type CommunityOverviewCardProps = {
  metric: CommunityOverviewMetric;
};

export default function CommunityOverviewCard({
  metric,
}: CommunityOverviewCardProps) {
  const { t } = useTranslation();
  const metricKey = METRIC_I18N_KEYS[metric.id] ?? metric.id;

  return (
    <View className="w-[47.5%] rounded-2xl border border-card-border bg-white p-4">
      <View className="size-10 items-center justify-center rounded-full bg-primary-50">
        <MaterialDesignIcons name={metric.icon} color={colors.primary} size={20} />
      </View>
      <Text className="mt-3 text-sm text-sec-text">
        {t(`service.metrics.${metricKey}`)}
      </Text>
      <Text className="mt-1 text-xl font-bold text-heading">
        {metric.value}
      </Text>
    </View>
  );
}
