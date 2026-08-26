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
  useRef,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type DeleteVisitorBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type DeleteVisitorBottomSheetProps = {
  onConfirmDelete: () => void;
};

const DeleteVisitorBottomSheet = forwardRef<
  DeleteVisitorBottomSheetRef,
  DeleteVisitorBottomSheetProps
>(function DeleteVisitorBottomSheet({ onConfirmDelete }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

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

  const handleConfirm = () => {
    bottomSheetRef.current?.dismiss();
    onConfirmDelete();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#FFFFFF",
      }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <View className="items-center pt-2">
          <View className="size-24 items-center justify-center rounded-full bg-[#FFE6E6]">
            <MaterialDesignIcons
              name="trash-can-outline"
              color="#F87171"
              size={44}
            />
          </View>

          <Text className="mt-5 text-xl font-bold text-[#1F1F1F]">
            Delete Visitor!
          </Text>
          <Text className="mt-1 text-center text-sm text-[#90A1B9]">
            Are You Sure You Want To Delete This Visitor?
          </Text>
        </View>

        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={() => bottomSheetRef.current?.dismiss()}
            accessibilityRole="button"
            className="flex-1 items-center rounded-2xl border border-[#CAD5E2] bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-[#62748E]">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            accessibilityRole="button"
            className="flex-1 items-center rounded-2xl bg-[#F87171] py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-white">Yes, Delete</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DeleteVisitorBottomSheet;
