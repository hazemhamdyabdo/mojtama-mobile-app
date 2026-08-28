import PaymentMethodOptionCard from "@/features/payments/components/PaymentMethodOptionCard";
import type { PaymentMethodType } from "@/features/payments/types";
import { Text, View } from "react-native";

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
};

export default function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <View className="mb-6">
      <Text className="mb-4 text-base font-bold text-heading">
        Choose Payment Method
      </Text>
      <View className="flex-row gap-3">
        <PaymentMethodOptionCard
          method="bank-transfer"
          label="Bank Transfer"
          icon="bank-outline"
          selected={selectedMethod === "bank-transfer"}
          onPress={() => onSelectMethod("bank-transfer")}
        />
        <PaymentMethodOptionCard
          method="digital-wallet"
          label="Digital Wallet"
          icon="wallet-outline"
          selected={selectedMethod === "digital-wallet"}
          onPress={() => onSelectMethod("digital-wallet")}
        />
      </View>
    </View>
  );
}
