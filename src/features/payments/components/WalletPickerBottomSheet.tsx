import { PAYMENT_WALLETS } from "@/features/payments/constants/paymentMethods";
import PaymentProviderLogo from "@/features/payments/components/PaymentProviderLogo";
import type { PaymentWallet } from "@/features/payments/types";
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
import { Pressable, Text, View } from "react-native";

export type WalletPickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type WalletPickerBottomSheetProps = {
  selectedWalletId?: string;
  onSelectWallet: (wallet: PaymentWallet) => void;
};

const WalletPickerBottomSheet = forwardRef<
  WalletPickerBottomSheetRef,
  WalletPickerBottomSheetProps
>(function WalletPickerBottomSheet(
  { selectedWalletId, onSelectWallet },
  ref,
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const snapPoints = useMemo(() => ["75%"], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setSearchQuery("");
      bottomSheetRef.current?.present();
    },
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const filteredWallets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return PAYMENT_WALLETS;
    }

    return PAYMENT_WALLETS.filter(
      (wallet) =>
        wallet.name.toLowerCase().includes(query) ||
        wallet.nameAr.includes(query),
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

  const handleSelectWallet = (wallet: PaymentWallet) => {
    onSelectWallet(wallet);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <BottomSheetView className="flex-1 px-4 pb-6">
        <Text className="mb-4 text-center text-lg font-bold text-[#1F1F1F]">
          Select Your Wallet
        </Text>

        <View className="mb-4 flex-row items-center rounded-full border border-[#E4E4E7] bg-white px-4">
          <MaterialDesignIcons name="magnify" color="#7B61FF" size={20} />
          <BottomSheetTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search For Your Wallet"
            placeholderTextColor="#90A1B9"
            className="flex-1 py-3.5 pl-2 text-base text-[#1F1F1F]"
          />
        </View>

        <BottomSheetFlatList
          data={filteredWallets}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectWallet(item)}
              accessibilityRole="button"
              className={`mb-3 flex-row items-center rounded-2xl border px-4 py-3 active:opacity-[0.92] ${
                selectedWalletId === item.id
                  ? "border-[#7B61FF] bg-[#F8F6FF]"
                  : "border-[#E4E4E7] bg-white"
              }`}
            >
              <PaymentProviderLogo logo={item.logo} />
              <Text className="ml-3 flex-1 text-sm font-medium text-[#1F1F1F]">
                {item.name} - {item.nameAr}
              </Text>
            </Pressable>
          )}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default WalletPickerBottomSheet;
