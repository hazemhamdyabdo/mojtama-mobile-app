import PaymentMethodOptionCard from "@/features/payments/components/PaymentMethodOptionCard";
import type { PaymentMethodType } from "@/features/payments/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
};

export default function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-6">
      <Text className="mb-4 text-base font-bold text-heading">
        {t("payments.methods.choose")}
      </Text>
      <View className="flex-row gap-3">
        <PaymentMethodOptionCard
          method="bank-transfer"
          label={t("payments.methods.bankTransfer")}
          icon="bank-outline"
          selected={selectedMethod === "bank-transfer"}
          onPress={() => onSelectMethod("bank-transfer")}
        />
        <PaymentMethodOptionCard
          method="digital-wallet"
          label={t("payments.methods.digitalWallet")}
          icon="wallet-outline"
          selected={selectedMethod === "digital-wallet"}
          onPress={() => onSelectMethod("digital-wallet")}
        />
      </View>
    </View>
  );
}
