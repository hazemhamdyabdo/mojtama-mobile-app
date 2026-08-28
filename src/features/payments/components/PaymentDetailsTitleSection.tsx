import PaymentStatusBadge from "@/features/payments/components/PaymentStatusBadge";
import type { PaymentBillDetails } from "@/features/payments/types";
import { Text, View } from "react-native";

type PaymentDetailsTitleSectionProps = {
  bill: PaymentBillDetails;
};

export default function PaymentDetailsTitleSection({
  bill,
}: PaymentDetailsTitleSectionProps) {
  return (
    <View className="mb-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-2xl font-bold text-heading">
          {bill.title}
        </Text>
        <PaymentStatusBadge status={bill.status} />
      </View>
      <Text className="mt-2 text-sm leading-5 text-sec-text">
        {bill.description}
      </Text>
    </View>
  );
}
