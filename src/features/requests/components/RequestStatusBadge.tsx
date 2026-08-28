import type { RequestStatus } from "@/features/requests/types";
import { Text, View } from "react-native";

type RequestStatusBadgeProps = {
  status: RequestStatus;
};

function getStatusStyles(status: RequestStatus) {
  switch (status) {
    case "pending":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
        label: "Pending",
      };
    case "assigned":
      return {
        container: "bg-primary-50",
        text: "text-primary",
        label: "Assigned",
      };
    case "in-progress":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
        label: "In Progress",
      };
    case "submitted":
      return {
        container: "bg-primary-50",
        text: "text-primary",
        label: "Submitted",
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const styles = getStatusStyles(status);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{styles.label}</Text>
    </View>
  );
}
