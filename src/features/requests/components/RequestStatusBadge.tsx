import type { RequestStatus } from "@/features/requests/types";
import { Text, View } from "react-native";

type RequestStatusBadgeProps = {
  status: RequestStatus;
};

function getStatusStyles(status: RequestStatus) {
  switch (status) {
    case "pending":
      return {
        container: "bg-[#FEF9C3]",
        text: "text-[#CA8A04]",
        label: "Pending",
      };
    case "assigned":
      return {
        container: "bg-[#F0EDFF]",
        text: "text-[#7B61FF]",
        label: "Assigned",
      };
    case "in-progress":
      return {
        container: "bg-[#FEF9C3]",
        text: "text-[#D97706]",
        label: "In Progress",
      };
    case "submitted":
      return {
        container: "bg-[#F0EDFF]",
        text: "text-[#7B61FF]",
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
