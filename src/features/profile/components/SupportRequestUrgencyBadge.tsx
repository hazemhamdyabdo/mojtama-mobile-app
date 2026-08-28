import type { SupportRequestUrgency } from "@/features/profile/types";
import { Text, View } from "react-native";

type SupportRequestUrgencyBadgeProps = {
  urgency: SupportRequestUrgency;
};

function getUrgencyStyles(urgency: SupportRequestUrgency) {
  switch (urgency) {
    case "urgent":
      return {
        container: "bg-rejected-50",
        text: "text-rejected",
        label: "Urgent",
      };
    case "medium":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
        label: "Medium",
      };
    default: {
      const _exhaustive: never = urgency;
      return _exhaustive;
    }
  }
}

export default function SupportRequestUrgencyBadge({
  urgency,
}: SupportRequestUrgencyBadgeProps) {
  const styles = getUrgencyStyles(urgency);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{styles.label}</Text>
    </View>
  );
}
