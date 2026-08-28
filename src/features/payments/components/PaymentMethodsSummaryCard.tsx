import { colors } from "@/theme/colors";
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
    <View className="mb-6 rounded-2xl border border-card-border bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-base font-bold text-heading">
          {bill.title}
        </Text>
        <PaymentStatusBadge status={bill.status} />
      </View>

      <Text className="mt-2 text-sm leading-5 text-sec-text">
        {bill.description}
      </Text>

      <View className="mt-4 gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-sec-text">Date</Text>
          <View className="flex-row items-center gap-1.5">
            <MaterialDesignIcons
              name="calendar-blank-outline"
              color={colors.secText}
              size={16}
            />
            <Text className="text-sm text-heading">{bill.date}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-sec-text">Total</Text>
          <Text className="text-sm font-bold text-primary">{bill.amount}</Text>
        </View>
      </View>
    </View>
  );
}
