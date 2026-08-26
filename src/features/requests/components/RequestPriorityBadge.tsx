import type { RequestPriority } from "@/features/requests/types";
import { Text, View } from "react-native";

type RequestPriorityBadgeProps = {
  priority: RequestPriority;
};

function getPriorityStyles(priority: RequestPriority) {
  switch (priority) {
    case "urgent":
      return {
        container: "bg-[#FEE2E2]",
        text: "text-[#EF4444]",
        label: "Urgent",
      };
    case "high":
      return {
        container: "bg-[#FFEDD5]",
        text: "text-[#F97316]",
        label: "High",
      };
    case "medium":
      return {
        container: "bg-[#FEF9C3]",
        text: "text-[#D97706]",
        label: "Medium",
      };
    case "low":
      return {
        container: "bg-[#E5F0FC]",
        text: "text-[#2B7FFF]",
        label: "low",
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
  const styles = getPriorityStyles(priority);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {styles.label}
      </Text>
    </View>
  );
}
