import type { RequestPriority } from "@/features/requests/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type RequestPriorityBadgeProps = {
  priority: RequestPriority;
};

function getPriorityStyles(priority: RequestPriority) {
  switch (priority) {
    case "urgent":
      return {
        container: "bg-rejected-50",
        text: "text-rejected",
      };
    case "high":
      return {
        container: "bg-pending-100",
        text: "text-pending-600",
      };
    case "medium":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
      };
    case "low":
      return {
        container: "bg-primary-50",
        text: "text-primary-600",
      };
    default: {
      const exhaustive: never = priority;
      return exhaustive;
    }
  }
}

export default function RequestPriorityBadge({
  priority,
}: RequestPriorityBadgeProps) {
  const { t } = useTranslation();
  const styles = getPriorityStyles(priority);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {translateLabel(t, "requests.priorityShort", priority)}
      </Text>
    </View>
  );
}
