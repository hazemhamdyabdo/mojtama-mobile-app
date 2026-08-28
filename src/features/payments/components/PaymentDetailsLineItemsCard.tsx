import type { PaymentLineItem } from "@/features/payments/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type PaymentDetailsLineItemsCardProps = {
  lineItems: PaymentLineItem[];
};

export default function PaymentDetailsLineItemsCard({
  lineItems,
}: PaymentDetailsLineItemsCardProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-4 rounded-2xl bg-slate-50 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-sm text-sec-text">
          {t("payments.invoice.description")}
        </Text>
        <Text className="text-sm text-sec-text">
          {t("payments.invoice.amount")}
        </Text>
      </View>

      {lineItems.map((item) => (
        <View
          key={item.id}
          className="mb-2 flex-row items-center justify-between last:mb-0"
        >
          <Text className="flex-1 text-sm text-heading">
            {item.description}
          </Text>
          <Text className="text-sm text-slate-500">{item.amount}</Text>
        </View>
      ))}
    </View>
  );
}
