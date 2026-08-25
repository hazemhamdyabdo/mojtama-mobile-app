import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";

export type PaymentSuccessBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type PaymentSuccessBottomSheetProps = {
  onViewDetails: () => void;
};

const PaymentSuccessBottomSheet = forwardRef<
  PaymentSuccessBottomSheetRef,
  PaymentSuccessBottomSheetProps
>(function PaymentSuccessBottomSheet({ onViewDetails }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["52%"], []);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

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

  const handleViewDetails = () => {
    bottomSheetRef.current?.dismiss();
    onViewDetails();
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
      <BottomSheetView className="flex-1 items-center px-6 pb-8 pt-2">
        <View className="mb-6 items-center justify-center">
          <View className="size-28 items-center justify-center rounded-full bg-[#F0EDFF]">
            <MaterialDesignIcons name="cash" color="#7B61FF" size={48} />
          </View>
        </View>

        <Text className="text-xl font-bold text-[#1F1F1F]">
          Payment Successful!
        </Text>
        <Text className="mt-2 text-center text-sm leading-5 text-[#90A1B9]">
          Thank You! Your Transaction Has Been Successfully Processed.
        </Text>

        <Pressable
          onPress={handleViewDetails}
          accessibilityRole="button"
          className="mt-8 w-full items-center rounded-2xl border border-[#7B61FF] bg-white py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-[#7B61FF]">View Details</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PaymentSuccessBottomSheet;
