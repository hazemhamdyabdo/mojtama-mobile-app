import PaymentStatusBadge from "@/features/payments/components/PaymentStatusBadge";
import type { PaymentBill } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type PaymentBillCardProps = {
  bill: PaymentBill;
  onPress?: (billId: string) => void;
  onPayPress?: (billId: string) => void;
};

export default function PaymentBillCard({
  bill,
  onPress,
  onPayPress,
}: PaymentBillCardProps) {
  const showPayButton = bill.status === "pending" || bill.status === "overdue";

  return (
    <View className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <Pressable
        onPress={() => onPress?.(bill.id)}
        accessibilityRole="button"
        className="active:opacity-[0.92]"
      >
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
            <Text className="text-sm text-[#90A1B9]">Amount</Text>
            <Text className="text-sm font-bold text-[#7B61FF]">
              {bill.amount}
            </Text>
          </View>
        </View>
      </Pressable>

      {showPayButton ? (
        <Pressable
          onPress={() => onPayPress?.(bill.id)}
          accessibilityRole="button"
          className="mt-4 items-center rounded-2xl bg-[#7B61FF] py-3.5 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">Pay Now</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
