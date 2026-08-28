import type { VisitorStatus } from "@/features/visitors/types";
import { Text, View } from "react-native";

type VisitorStatusBadgeProps = {
  status: VisitorStatus;
};

function getStatusStyles(status: VisitorStatus) {
  switch (status) {
    case "approved":
      return {
        container: "bg-approved-50",
        text: "text-approved-600",
        label: "Approved",
      };
    case "pending":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
        label: "Pending",
      };
    case "complete":
      return {
        container: "bg-primary-50",
        text: "text-primary",
        label: "Complete",
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function VisitorStatusBadge({
  status,
}: VisitorStatusBadgeProps) {
  const styles = getStatusStyles(status);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-semibold ${styles.text}`}>
        {styles.label}
      </Text>
    </View>
  );
}
