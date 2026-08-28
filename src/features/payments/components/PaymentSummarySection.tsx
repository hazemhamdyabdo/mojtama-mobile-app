import PaymentSummaryCard from "@/features/payments/components/PaymentSummaryCard";
import { usePaymentsState } from "@/features/payments/hooks/usePaymentsState";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function PaymentSummarySection() {
  const { t } = useTranslation();
  const { summary } = usePaymentsState();

  return (
    <View className="mb-6 flex-row gap-3">
      <PaymentSummaryCard
        label={t("payments.summary.totalDue")}
        amount={summary.totalDue}
        icon="credit-card-outline"
      />
      <PaymentSummaryCard
        label={t("payments.summary.totalPaid")}
        amount={summary.totalPaid}
        icon="wallet-outline"
      />
    </View>
  );
}
