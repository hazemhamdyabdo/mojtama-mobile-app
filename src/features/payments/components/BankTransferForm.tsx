import PaymentProviderLogo from "@/features/payments/components/PaymentProviderLogo";
import type { BankTransferFormValues } from "@/features/payments/schemas/paymentMethodsSchema";
import type { PaymentBank } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
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
  return (
    <View className="gap-4">
      <View>
        <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
          Bank Name
        </Text>
        <Pressable
          onPress={onOpenBankPicker}
          accessibilityRole="button"
          className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
            errors.bankId ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
          }`}
        >
          <View className="flex-1 flex-row items-center gap-3">
            {selectedBank ? (
              <PaymentProviderLogo logo={selectedBank.logo} size={32} />
            ) : null}
            <Text
              className={`flex-1 text-base ${
                selectedBank ? "text-[#1F1F1F]" : "text-[#90A1B9]"
              }`}
            >
              {selectedBank?.name ?? "Select Bank"}
            </Text>
          </View>
          <MaterialDesignIcons name="chevron-down" color="#90A1B9" size={22} />
        </Pressable>
        {errors.bankId ? (
          <Text className="mt-2 text-sm text-[#EF4444]">
            {errors.bankId.message}
          </Text>
        ) : null}
      </View>

      <View>
        <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
          Account No.
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
              placeholderTextColor="#90A1B9"
              keyboardType="number-pad"
              className={`rounded-xl border bg-white px-4 py-3.5 text-base text-[#1F1F1F] ${
                errors.accountNo ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
              }`}
            />
          )}
        />
        {errors.accountNo ? (
          <Text className="mt-2 text-sm text-[#EF4444]">
            {errors.accountNo.message}
          </Text>
        ) : null}
      </View>

      <View>
        <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
          Beneficiary name
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
              placeholderTextColor="#90A1B9"
              autoCapitalize="words"
              className={`rounded-xl border bg-white px-4 py-3.5 text-base text-[#1F1F1F] ${
                errors.beneficiaryName ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
              }`}
            />
          )}
        />
        {errors.beneficiaryName ? (
          <Text className="mt-2 text-sm text-[#EF4444]">
            {errors.beneficiaryName.message}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
