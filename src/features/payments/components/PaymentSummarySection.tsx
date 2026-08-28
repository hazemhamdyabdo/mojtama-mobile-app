import PaymentSummaryCard from "@/features/payments/components/PaymentSummaryCard";
import { PAYMENT_SUMMARY } from "@/features/payments/constants/dummy";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function PaymentSummarySection() {
  const { t } = useTranslation();

  return (
    <View className="mb-6 flex-row gap-3">
      <PaymentSummaryCard
        label={t("payments.summary.totalDue")}
        amount={PAYMENT_SUMMARY.totalDue}
        icon="credit-card-outline"
      />
      <PaymentSummaryCard
        label={t("payments.summary.totalPaid")}
        amount={PAYMENT_SUMMARY.totalPaid}
        icon="wallet-outline"
      />
    </View>
  );
}
