import { payBill } from "@/features/payments/api";
import { MockApiError } from "@/utils/mockApi";
import BankPickerBottomSheet, {
  type BankPickerBottomSheetRef,
} from "@/features/payments/components/BankPickerBottomSheet";
import BankTransferForm from "@/features/payments/components/BankTransferForm";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
type PaymentMethodsScreenProps = {
  bill: PaymentBillDetails;
};

export default function PaymentMethodsScreen({
  bill,
}: PaymentMethodsScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const bankPickerRef = useRef<BankPickerBottomSheetRef>(null);
  const walletPickerRef = useRef<WalletPickerBottomSheetRef>(null);
  const successSheetRef = useRef<PaymentSuccessBottomSheetRef>(null);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("bank-transfer");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [walletError, setWalletError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");

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

  const handleConfirmBankTransfer = async (values: BankTransferFormValues) => {
    if (bill.status === "paid" || isPaying) {
      return;
    }

    setPaymentError("");
    setIsPaying(true);

    try {
      const bank = PAYMENT_BANKS.find((item) => item.id === values.bankId);
      await payBill(bill.id, {
        method: "bank-transfer",
        paymentMethodLabel: bank?.name ?? "Bank transfer",
      });
      successSheetRef.current?.open();
    } catch (error) {
      setPaymentError(
        error instanceof MockApiError
          ? error.message
          : t("payments.errors.generic", { defaultValue: "Payment failed" }),
      );
    } finally {
      setIsPaying(false);
    }
  };

  const handleConfirmWallet = async () => {
    if (bill.status === "paid" || isPaying) {
      return;
    }

    const result = digitalWalletSchema.safeParse({
      walletId: selectedWalletId,
    });

    if (!result.success) {
      setWalletError(result.error.issues[0]?.message ?? t("payments.wallet.select"));
      return;
    }

    setPaymentError("");
    setIsPaying(true);

    try {
      await payBill(bill.id, {
        method: "digital-wallet",
        paymentMethodLabel: selectedWallet?.name ?? "Digital wallet",
      });
      successSheetRef.current?.open();
    } catch (error) {
      setPaymentError(
        error instanceof MockApiError
          ? error.message
          : t("payments.errors.generic", { defaultValue: "Payment failed" }),
      );
    } finally {
      setIsPaying(false);
    }
  };

  const handleConfirm = () => {
    if (selectedMethod === "bank-transfer") {
      void handleSubmit(handleConfirmBankTransfer)();
      return;
    }

    void handleConfirmWallet();
  };

  const handleViewDetails = () => {
    router.replace(`/payment/${bill.id}` as Href);
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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

      <View className="border-t border-card-border px-4 py-4">
        {paymentError ? (
          <Text className="mb-3 text-sm text-rejected">{paymentError}</Text>
        ) : null}
        <Pressable
          onPress={handleConfirm}
          disabled={isSubmitting || isPaying || bill.status === "paid"}
          accessibilityRole="button"
          className="items-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
        >
          <Text className="text-base font-bold text-white">
            {isPaying ? t("common.loading", { defaultValue: "Processing..." }) : t("common.confirm")}
          </Text>
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
    </ScreenSafeAreaView>
  );
}
