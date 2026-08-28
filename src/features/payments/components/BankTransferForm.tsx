import { colors } from "@/theme/colors";
import PaymentProviderLogo from "@/features/payments/components/PaymentProviderLogo";
import type { BankTransferFormValues } from "@/features/payments/schemas/paymentMethodsSchema";
import type { PaymentBank } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";

type BankTransferFormProps = {
  control: Control<BankTransferFormValues>;
  errors: FieldErrors<BankTransferFormValues>;
  selectedBank?: PaymentBank;
  onOpenBankPicker: () => void;
};

export default function BankTransferForm({
  control,
  errors,
  selectedBank,
  onOpenBankPicker,
}: BankTransferFormProps) {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View>
        <Text className="mb-2 text-sm font-semibold text-heading">
          {t("payments.bankTransfer.bankName")}
        </Text>
        <Pressable
          onPress={onOpenBankPicker}
          accessibilityRole="button"
          className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
            errors.bankId ? "border-rejected-200" : "border-card-border"
          }`}
        >
          <View className="flex-1 flex-row items-center gap-3">
            {selectedBank ? (
              <PaymentProviderLogo logo={selectedBank.logo} size={32} />
            ) : null}
            <Text
              className={`flex-1 text-base ${
                selectedBank ? "text-heading" : "text-sec-text"
              }`}
            >
              {selectedBank?.name ?? t("payments.bankTransfer.selectBank")}
            </Text>
          </View>
          <MaterialDesignIcons name="chevron-down" color={colors.secText} size={22} />
        </Pressable>
        {errors.bankId ? (
          <Text className="mt-2 text-sm text-rejected">
            {errors.bankId.message}
          </Text>
        ) : null}
      </View>

      <View>
        <Text className="mb-2 text-sm font-semibold text-heading">
          {t("payments.bankTransfer.accountNo")}
        </Text>
        <Controller
          control={control}
          name="accountNo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="6558 - 2567 - 6657 - 5637"
              placeholderTextColor={colors.secText}
              keyboardType="number-pad"
              className={`rounded-xl border bg-white px-4 py-3.5 text-base text-heading ${
                errors.accountNo ? "border-rejected-200" : "border-card-border"
              }`}
            />
          )}
        />
        {errors.accountNo ? (
          <Text className="mt-2 text-sm text-rejected">
            {errors.accountNo.message}
          </Text>
        ) : null}
      </View>

      <View>
        <Text className="mb-2 text-sm font-semibold text-heading">
          {t("payments.bankTransfer.beneficiaryName")}
        </Text>
        <Controller
          control={control}
          name="beneficiaryName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Omar ali"
              placeholderTextColor={colors.secText}
              autoCapitalize="words"
              className={`rounded-xl border bg-white px-4 py-3.5 text-base text-heading ${
                errors.beneficiaryName ? "border-rejected-200" : "border-card-border"
              }`}
            />
          )}
        />
        {errors.beneficiaryName ? (
          <Text className="mt-2 text-sm text-rejected">
            {errors.beneficiaryName.message}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
