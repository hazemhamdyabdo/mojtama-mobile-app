import { colors } from "@/theme/colors";
import PaymentProviderLogo from "@/features/payments/components/PaymentProviderLogo";
import type { PaymentWallet } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type DigitalWalletFormProps = {
  selectedWallet?: PaymentWallet;
  error?: string;
  onOpenWalletPicker: () => void;
};

export default function DigitalWalletForm({
  selectedWallet,
  error,
  onOpenWalletPicker,
}: DigitalWalletFormProps) {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-heading">
        {t("payments.methods.digitalWallet")}
      </Text>
      <Pressable
        onPress={onOpenWalletPicker}
        accessibilityRole="button"
        className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
          error ? "border-rejected-200" : "border-card-border"
        }`}
      >
        <View className="flex-1 flex-row items-center gap-3">
          {selectedWallet ? (
            <PaymentProviderLogo logo={selectedWallet.logo} size={32} />
          ) : null}
          <Text
            className={`flex-1 text-base ${
              selectedWallet ? "text-heading" : "text-sec-text"
            }`}
          >
            {selectedWallet
              ? `${selectedWallet.name} - ${selectedWallet.nameAr}`
              : t("payments.wallet.select")}
          </Text>
        </View>
        <MaterialDesignIcons name="chevron-down" color={colors.secText} size={22} />
      </Pressable>
      {error ? (
        <Text className="mt-2 text-sm text-rejected">{error}</Text>
      ) : null}
    </View>
  );
}
