import type { ResidentPaymentHistoryItem } from "@/features/residents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { colors } from "@/theme/colors";

type ResidentPaymentHistoryItemRowProps = {
  item: ResidentPaymentHistoryItem;
  isLast?: boolean;
};

function PaymentStatusBadge({
  status,
}: {
  status: ResidentPaymentHistoryItem["status"];
}) {
  const { t } = useTranslation();

  switch (status) {
    case "paid":
      return (
        <View className="rounded-full bg-approved-50 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-approved-700">
            {t("residents.paymentStatus.paid")}
          </Text>
        </View>
      );
    case "overdue":
      return (
        <View className="rounded-full bg-rejected-50 px-2.5 py-0.5">
          <Text className="text-xs font-medium text-rejected">
            {t("residents.paymentStatus.overdue")}
          </Text>
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
        isLast ? "" : "border-b border-card-border"
      }`}
    >
      <View
        className={`size-10 items-center justify-center rounded-full ${
          isPaid ? "bg-approved-50" : "bg-rejected-50"
        }`}
      >
        <MaterialDesignIcons
          name={isPaid ? "check" : "alert-circle-outline"}
          color={isPaid ? colors.approved700 : colors.rejected}
          size={18}
        />
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-heading">{item.title}</Text>
        <Text className="mt-0.5 text-xs text-slate-500">{item.date}</Text>
      </View>

      <View className="items-end">
        <Text className="text-sm font-bold text-heading">{item.amount}</Text>
        <View className="mt-1">
          <PaymentStatusBadge status={item.status} />
        </View>
      </View>
    </View>
  );
}
