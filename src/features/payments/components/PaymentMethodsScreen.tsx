import BankPickerBottomSheet, {
  type BankPickerBottomSheetRef,
} from "@/features/payments/components/BankPickerBottomSheet";
import BankTransferForm from "@/features/payments/components/BankTransferForm";
import DigitalWalletForm from "@/features/payments/components/DigitalWalletForm";
import PaymentMethodSelector from "@/features/payments/components/PaymentMethodSelector";
import PaymentMethodsHeader from "@/features/payments/components/PaymentMethodsHeader";
import PaymentMethodsSummaryCard from "@/features/payments/components/PaymentMethodsSummaryCard";
import PaymentSuccessBottomSheet, {
  type PaymentSuccessBottomSheetRef,
} from "@/features/payments/components/PaymentSuccessBottomSheet";
import WalletPickerBottomSheet, {
  type WalletPickerBottomSheetRef,
} from "@/features/payments/components/WalletPickerBottomSheet";
import {
  PAYMENT_BANKS,
  PAYMENT_WALLETS,
} from "@/features/payments/constants/paymentMethods";
import {
  bankTransferSchema,
  digitalWalletSchema,
  type BankTransferFormValues,
} from "@/features/payments/schemas/paymentMethodsSchema";
import type {
  PaymentBillDetails,
  PaymentMethodType,
} from "@/features/payments/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type PaymentMethodsScreenProps = {
  bill: PaymentBillDetails;
};

export default function PaymentMethodsScreen({
  bill,
}: PaymentMethodsScreenProps) {
  const router = useRouter();
  const bankPickerRef = useRef<BankPickerBottomSheetRef>(null);
  const walletPickerRef = useRef<WalletPickerBottomSheetRef>(null);
  const successSheetRef = useRef<PaymentSuccessBottomSheetRef>(null);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("bank-transfer");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [walletError, setWalletError] = useState("");

  const selectedBank = PAYMENT_BANKS.find((bank) => bank.id === selectedBankId);
  const selectedWallet = PAYMENT_WALLETS.find(
    (wallet) => wallet.id === selectedWalletId,
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BankTransferFormValues>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      bankId: "",
      accountNo: "",
      beneficiaryName: "",
    },
  });

  const handleSelectBank = (bankId: string) => {
    setSelectedBankId(bankId);
    setValue("bankId", bankId, { shouldValidate: true });
  };

  const handleSelectWallet = (walletId: string) => {
    setSelectedWalletId(walletId);
    setWalletError("");
  };

  const handleConfirmBankTransfer = (values: BankTransferFormValues) => {
    console.log("confirm bank transfer", { billId: bill.id, ...values });
    successSheetRef.current?.open();
  };

  const handleConfirmWallet = () => {
    const result = digitalWalletSchema.safeParse({
      walletId: selectedWalletId,
    });

    if (!result.success) {
      setWalletError(result.error.issues[0]?.message ?? "Select a wallet");
      return;
    }

    console.log("confirm wallet payment", {
      billId: bill.id,
      walletId: selectedWalletId,
    });
    successSheetRef.current?.open();
  };

  const handleConfirm = () => {
    if (selectedMethod === "bank-transfer") {
      void handleSubmit(handleConfirmBankTransfer)();
      return;
    }

    handleConfirmWallet();
  };

  const handleViewDetails = () => {
    router.replace(`/payment/${bill.id}` as Href);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PaymentMethodsHeader />
        <PaymentMethodsSummaryCard bill={bill} />
        <PaymentMethodSelector
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
        />

        {selectedMethod === "bank-transfer" ? (
          <BankTransferForm
            control={control}
            errors={errors}
            selectedBank={selectedBank}
            onOpenBankPicker={() => bankPickerRef.current?.open()}
          />
        ) : (
          <DigitalWalletForm
            selectedWallet={selectedWallet}
            error={walletError}
            onOpenWalletPicker={() => walletPickerRef.current?.open()}
          />
        )}
      </ScrollView>

      <View className="border-t border-[#E4E4E7] px-4 py-4">
        <Pressable
          onPress={handleConfirm}
          disabled={isSubmitting}
          accessibilityRole="button"
          className="items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
        >
          <Text className="text-base font-bold text-white">Confirm</Text>
        </Pressable>
      </View>

      <BankPickerBottomSheet
        ref={bankPickerRef}
        selectedBankId={selectedBankId}
        onSelectBank={(bank) => handleSelectBank(bank.id)}
      />

      <WalletPickerBottomSheet
        ref={walletPickerRef}
        selectedWalletId={selectedWalletId}
        onSelectWallet={(wallet) => handleSelectWallet(wallet.id)}
      />

      <PaymentSuccessBottomSheet
        ref={successSheetRef}
        onViewDetails={handleViewDetails}
      />
    </SafeAreaView>
  );
}
