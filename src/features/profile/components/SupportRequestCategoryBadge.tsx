import type { SupportRequestCategory } from "@/features/profile/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type SupportRequestCategoryBadgeProps = {
  category: SupportRequestCategory;
};

export default function SupportRequestCategoryBadge({
  category,
}: SupportRequestCategoryBadgeProps) {
  const { t } = useTranslation();

  switch (category) {
    case "maintenance":
      return (
        <View className="rounded-full bg-approved-700 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-white">
            {t("requests.filters.maintenance")}
          </Text>
        </View>
      );
    case "noise":
      return (
        <View className="rounded-full bg-pending-50 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-pending-700">
            {t("requests.filters.noise")}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = category;
      return exhaustive;
    }
  }
}
