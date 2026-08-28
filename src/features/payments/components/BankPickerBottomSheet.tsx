import { colors } from "@/theme/colors";
import { PAYMENT_BANKS } from "@/features/payments/constants/paymentMethods";
import PaymentProviderLogo from "@/features/payments/components/PaymentProviderLogo";
import type { PaymentBank } from "@/features/payments/types";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export type BankPickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type BankPickerBottomSheetProps = {
  selectedBankId?: string;
  onSelectBank: (bank: PaymentBank) => void;
};

const BankPickerBottomSheet = forwardRef<
  BankPickerBottomSheetRef,
  BankPickerBottomSheetProps
>(function BankPickerBottomSheet({ selectedBankId, onSelectBank }, ref) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const snapPoints = useMemo(() => ["70%"], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setSearchQuery("");
      bottomSheetRef.current?.present();
    },
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const filteredBanks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return PAYMENT_BANKS;
    }

    return PAYMENT_BANKS.filter(
      (bank) =>
        bank.name.toLowerCase().includes(query) ||
        bank.nameAr.includes(query),
    );
  }, [searchQuery]);

  const renderBackdrop = useCallback(
    (props: ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSelectBank = (bank: PaymentBank) => {
    onSelectBank(bank);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.heading, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <BottomSheetView className="flex-1 px-4 pb-6">
        <Text className="mb-4 text-center text-lg font-bold text-heading">
          {t("payments.bankTransfer.selectYourBank")}
        </Text>

        <View className="mb-4 flex-row items-center rounded-full border border-card-border bg-white px-4">
          <MaterialDesignIcons name="magnify" color={colors.primary} size={20} />
          <BottomSheetTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("payments.bankTransfer.searchBank")}
            placeholderTextColor={colors.secText}
            className="flex-1 py-3.5 pl-2 text-base text-heading"
          />
        </View>

        <BottomSheetFlatList
          data={filteredBanks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectBank(item)}
              accessibilityRole="button"
              className={`mb-3 flex-row items-center rounded-2xl border px-4 py-3 active:opacity-[0.92] ${
                selectedBankId === item.id
                  ? "border-primary bg-primary-50"
                  : "border-card-border bg-white"
              }`}
            >
              <PaymentProviderLogo logo={item.logo} />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-heading">
                  {item.name}
                </Text>
                <Text className="text-xs text-sec-text">{item.nameAr}</Text>
              </View>
            </Pressable>
          )}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BankPickerBottomSheet;
