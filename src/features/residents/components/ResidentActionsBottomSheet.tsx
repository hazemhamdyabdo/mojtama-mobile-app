import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ComponentProps,
} from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export type ResidentActionsBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type ResidentActionsBottomSheetProps = {
  onRemove: () => void;
};

const ResidentActionsBottomSheet = forwardRef<
  ResidentActionsBottomSheetRef,
  ResidentActionsBottomSheetProps
>(function ResidentActionsBottomSheet({ onRemove }, ref) {
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

  const handleRemove = () => {
    bottomSheetRef.current?.dismiss();
    onRemove();
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
        <Pressable
          onPress={handleRemove}
          accessibilityRole="button"
          className="items-center rounded-2xl bg-rejected-50 py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-rejected-500">
            {t("residents.remove.title")}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => bottomSheetRef.current?.dismiss()}
          accessibilityRole="button"
          className="mt-3 items-center py-3 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-heading">{t("common.cancel")}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ResidentActionsBottomSheet;
