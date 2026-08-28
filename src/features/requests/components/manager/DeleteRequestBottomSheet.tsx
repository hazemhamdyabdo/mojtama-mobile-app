import { colors } from "@/theme/colors";
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
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type DeleteRequestBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type DeleteRequestBottomSheetProps = {
  onConfirmDelete: () => void;
};

const DeleteRequestBottomSheet = forwardRef<
  DeleteRequestBottomSheetRef,
  DeleteRequestBottomSheetProps
>(function DeleteRequestBottomSheet({ onConfirmDelete }, ref) {
  const { t } = useTranslation();
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
      handleIndicatorStyle={{ backgroundColor: colors.heading, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: colors.white,
      }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <View className="items-center pt-2">
          <View className="size-24 items-center justify-center rounded-full bg-rejected-50">
            <MaterialDesignIcons
              name="trash-can-outline"
              color={colors.rejected}
              size={44}
            />
          </View>

          <Text className="mt-5 text-xl font-bold text-heading">
            {t("requests.deleteSheet.title")}
          </Text>
          <Text className="mt-1 text-center text-sm text-sec-text">
            {t("requests.deleteSheet.message")}
          </Text>
        </View>

        <View className="mt-6 flex-row gap-3">
          <Pressable
            onPress={() => bottomSheetRef.current?.dismiss()}
            accessibilityRole="button"
            className="flex-1 items-center rounded-2xl border border-input-text bg-white py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-slate-500">
              {t("common.cancel")}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            accessibilityRole="button"
            className="flex-1 items-center rounded-2xl bg-rejected-500 py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-white">
              {t("common.yesDelete")}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DeleteRequestBottomSheet;
