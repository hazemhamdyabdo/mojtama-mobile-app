import type { PaymentBillStatus } from "@/features/payments/types";
import { useTranslation } from "react-i18next";
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
      };
    case "overdue":
      return {
        container: "bg-rejected-50",
        text: "text-rejected",
      };
    case "paid":
      return {
        container: "bg-approved-50",
        text: "text-approved-600",
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const { t } = useTranslation();
  const styles = getStatusStyles(status);

  return (
    <View className={`rounded-full px-2.5 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {t(`payments.status.${status}`)}
      </Text>
    </View>
  );
}
