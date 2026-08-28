import type { PaymentBillStatus } from "@/features/payments/types";
import { Text, View } from "react-native";

type PaymentStatusBadgeProps = {
  status: PaymentBillStatus;
};

function getStatusStyles(status: PaymentBillStatus) {
  switch (status) {
    case "pending":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
        label: "Pending",
      };
    case "overdue":
      return {
        container: "bg-rejected-50",
        text: "text-rejected",
        label: "Overdue",
      };
    case "paid":
      return {
        container: "bg-approved-50",
        text: "text-approved-600",
        label: "Paid",
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const styles = getStatusStyles(status);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-semibold ${styles.text}`}>
        {styles.label}
      </Text>
    </View>
  );
}
