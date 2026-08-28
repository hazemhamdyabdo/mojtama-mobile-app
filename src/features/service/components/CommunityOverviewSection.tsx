import CommunityOverviewCard from "@/features/service/components/CommunityOverviewCard";
import { ADMIN_OVERVIEW_METRICS } from "@/features/service/constants/dummy";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function CommunityOverviewSection() {
  const { t } = useTranslation();

  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-heading">
        {t("service.admin.overview.title")}
      </Text>
      <Text className="mt-1 text-sm text-sec-text">
        {t("service.admin.overview.subtitle")}
      </Text>

      <View className="mt-4 flex-row flex-wrap justify-between gap-y-3">
        {ADMIN_OVERVIEW_METRICS.map((metric) => (
          <CommunityOverviewCard key={metric.id} metric={metric} />
        ))}
      </View>
    </View>
  );
}
