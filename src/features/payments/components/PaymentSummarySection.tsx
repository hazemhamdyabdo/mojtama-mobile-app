import PaymentSummaryCard from "@/features/payments/components/PaymentSummaryCard";
import { PAYMENT_SUMMARY } from "@/features/payments/constants/dummy";
import { View } from "react-native";

export default function PaymentSummarySection() {
  return (
    <View className="mb-6 flex-row gap-3">
      <PaymentSummaryCard
        label="Total Due"
        amount={PAYMENT_SUMMARY.totalDue}
        icon="credit-card-outline"
      />
      <PaymentSummaryCard
        label="Total Paid"
        amount={PAYMENT_SUMMARY.totalPaid}
        icon="wallet-outline"
      />
    </View>
  );
}
