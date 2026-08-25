import PaymentStatusBadge from "@/features/payments/components/PaymentStatusBadge";
import type { PaymentBillDetails } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type PaymentMethodsSummaryCardProps = {
  bill: PaymentBillDetails;
};

export default function PaymentMethodsSummaryCard({
  bill,
}: PaymentMethodsSummaryCardProps) {
  return (
    <View className="mb-6 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-base font-bold text-[#1F1F1F]">
          {bill.title}
        </Text>
        <PaymentStatusBadge status={bill.status} />
      </View>

      <Text className="mt-2 text-sm leading-5 text-[#90A1B9]">
        {bill.description}
      </Text>

      <View className="mt-4 gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-[#90A1B9]">Date</Text>
          <View className="flex-row items-center gap-1.5">
            <MaterialDesignIcons
              name="calendar-blank-outline"
              color="#90A1B9"
              size={16}
            />
            <Text className="text-sm text-[#1F1F1F]">{bill.date}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-[#90A1B9]">Total</Text>
          <Text className="text-sm font-bold text-[#7B61FF]">{bill.amount}</Text>
        </View>
      </View>
    </View>
  );
}
