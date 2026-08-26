import type { VisitorStatus } from "@/features/visitors/types";
import { Text, View } from "react-native";

type VisitorStatusBadgeProps = {
  status: VisitorStatus;
};

function getStatusStyles(status: VisitorStatus) {
  switch (status) {
    case "approved":
      return {
        container: "bg-[#E1F9F0]",
        text: "text-[#059669]",
        label: "Approved",
      };
    case "pending":
      return {
        container: "bg-[#FFF6DE]",
        text: "text-[#D97706]",
        label: "Pending",
      };
    case "complete":
      return {
        container: "bg-[#F0EDFF]",
        text: "text-[#7B61FF]",
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
