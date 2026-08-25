import type { PaymentBillStatus } from "@/features/payments/types";
import { Text, View } from "react-native";

type PaymentStatusBadgeProps = {
  status: PaymentBillStatus;
};

function getStatusStyles(status: PaymentBillStatus) {
  switch (status) {
    case "pending":
      return {
        container: "bg-[#FFF6DE]",
        text: "text-[#D97706]",
        label: "Pending",
      };
    case "overdue":
      return {
        container: "bg-[#FFE6E6]",
        text: "text-[#EF4444]",
        label: "Overdue",
      };
    case "paid":
      return {
        container: "bg-[#E1F9F0]",
        text: "text-[#059669]",
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
