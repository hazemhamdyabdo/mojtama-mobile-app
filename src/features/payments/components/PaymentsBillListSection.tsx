import PaymentBillCard from "@/features/payments/components/PaymentBillCard";
import type { PaymentBill } from "@/features/payments/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type PaymentsBillListSectionProps = {
  bills: PaymentBill[];
  onBillPress?: (billId: string) => void;
  onPayPress?: (billId: string) => void;
};

export default function PaymentsBillListSection({
  bills,
  onBillPress,
  onPayPress,
}: PaymentsBillListSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-base font-bold text-heading">
          {t("payments.bills.sectionTitle")}
        </Text>
        <Text className="text-sm text-sec-text">
          {bills.length}{" "}
          {bills.length === 1
            ? t("payments.bills.bill")
            : t("payments.bills.bills")}
        </Text>
      </View>

      {bills.map((bill) => (
        <PaymentBillCard
          key={bill.id}
          bill={bill}
          onPress={onBillPress}
          onPayPress={onPayPress}
        />
      ))}
    </View>
  );
}
