import type { ResidentPaymentHistoryItem } from "@/features/residents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type ResidentPaymentHistoryItemRowProps = {
  item: ResidentPaymentHistoryItem;
  isLast?: boolean;
};

function PaymentStatusBadge({
  status,
}: {
  status: ResidentPaymentHistoryItem["status"];
}) {
  switch (status) {
    case "paid":
      return (
        <View className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5">
          <Text className="text-xs font-medium text-[#16A34A]">Paid</Text>
        </View>
      );
    case "overdue":
      return (
        <View className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5">
          <Text className="text-xs font-medium text-[#EF4444]">Overdue</Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function ResidentPaymentHistoryItemRow({
  item,
  isLast = false,
}: ResidentPaymentHistoryItemRowProps) {
  const isPaid = item.status === "paid";

  return (
    <View
      className={`flex-row items-center gap-3 px-4 py-4 ${
        isLast ? "" : "border-b border-[#E4E4E7]"
      }`}
    >
      <View
        className={`size-10 items-center justify-center rounded-full ${
          isPaid ? "bg-[#DCFCE7]" : "bg-[#FEE2E2]"
        }`}
      >
        <MaterialDesignIcons
          name={isPaid ? "check" : "alert-circle-outline"}
          color={isPaid ? "#16A34A" : "#EF4444"}
          size={18}
        />
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-[#1F1F1F]">{item.title}</Text>
        <Text className="mt-0.5 text-xs text-[#64748B]">{item.date}</Text>
      </View>

      <View className="items-end">
        <Text className="text-sm font-bold text-[#1F1F1F]">{item.amount}</Text>
        <View className="mt-1">
          <PaymentStatusBadge status={item.status} />
        </View>
      </View>
    </View>
  );
}
