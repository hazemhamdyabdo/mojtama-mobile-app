import PaymentBillCard from "@/features/payments/components/PaymentBillCard";
import type { PaymentBill } from "@/features/payments/types";
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
  return (
    <View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-base font-bold text-heading">Your Bills</Text>
        <Text className="text-sm text-sec-text">
          {bills.length} {bills.length === 1 ? "Bill" : "Bills"}
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
