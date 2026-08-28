import { colors } from "@/theme/colors";
import type { PaymentBillDetails } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type PaymentMethodsSummaryCardProps = {
  bill: PaymentBillDetails;
};

export default function PaymentMethodsSummaryCard({
  bill,
}: PaymentMethodsSummaryCardProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-6 rounded-2xl border border-card-border bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <Text className="flex-1 text-base font-bold text-heading">
          {bill.title}
        </Text>
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
            {t("payments.invoice.total")}
          </Text>
          <Text className="text-sm font-bold text-primary">{bill.amount}</Text>
        </View>
      </View>
    </View>
  );
}
