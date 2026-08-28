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
import { colors } from "@/theme/colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export type VisitorActionsBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type VisitorActionsBottomSheetProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const VisitorActionsBottomSheet = forwardRef<
  VisitorActionsBottomSheetRef,
  VisitorActionsBottomSheetProps
>(function VisitorActionsBottomSheet({ onEdit, onDelete }, ref) {
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

  const handleEdit = () => {
    bottomSheetRef.current?.dismiss();
    onEdit();
  };

  const handleDelete = () => {
    bottomSheetRef.current?.dismiss();
    onDelete();
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
      }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <Pressable
          onPress={handleEdit}
          accessibilityRole="button"
          className="py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-medium text-heading">
            {t("visitors.actions.edit")}
          </Text>
        </Pressable>

        <View className="h-px bg-slate-200" />

        <Pressable
          onPress={handleDelete}
          accessibilityRole="button"
          className="py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-medium text-rejected-500">
            {t("visitors.actions.delete")}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => bottomSheetRef.current?.dismiss()}
          accessibilityRole="button"
          className="items-center py-3 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-heading">{t("common.cancel")}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default VisitorActionsBottomSheet;
