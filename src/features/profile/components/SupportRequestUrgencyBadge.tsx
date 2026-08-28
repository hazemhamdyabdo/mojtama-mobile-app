import type { SupportRequestUrgency } from "@/features/profile/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type SupportRequestUrgencyBadgeProps = {
  urgency: SupportRequestUrgency;
};

export default function SupportRequestUrgencyBadge({
  urgency,
}: SupportRequestUrgencyBadgeProps) {
  const { t } = useTranslation();

  switch (urgency) {
    case "urgent":
      return (
        <View className="rounded-full bg-rejected-50 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-rejected">
            {t("profile.urgency.urgent")}
          </Text>
        </View>
      );
    case "medium":
      return (
        <View className="rounded-full bg-pending-50 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-pending-700">
            {t("profile.urgency.medium")}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = urgency;
      return exhaustive;
    }
  }
}
