import { colors } from "@/theme/colors";
import PaymentStatusBadge from "@/features/payments/components/PaymentStatusBadge";
import type { PaymentBill } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const showPayButton = bill.status === "pending" || bill.status === "overdue";

  return (
    <View className="mb-4 rounded-2xl border border-card-border bg-white p-4">
      <Pressable
        onPress={() => onPress?.(bill.id)}
        accessibilityRole="button"
        className="active:opacity-[0.92]"
      >
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
            <Text className="text-sm text-sec-text">{t("common.date")}</Text>
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
            <Text className="text-sm text-sec-text">
              {t("payments.invoice.amount")}
            </Text>
            <Text className="text-sm font-bold text-primary">
              {bill.amount}
            </Text>
          </View>
        </View>
      </Pressable>

      {showPayButton ? (
        <Pressable
          onPress={() => onPayPress?.(bill.id)}
          accessibilityRole="button"
          className="mt-4 items-center rounded-2xl bg-primary py-3.5 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">
            {t("payments.actions.payNow")}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
