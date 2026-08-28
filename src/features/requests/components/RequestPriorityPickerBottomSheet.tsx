import { colors } from "@/theme/colors";
import { REQUEST_PRIORITY_OPTIONS } from "@/features/requests/constants/dummy";
import type { RequestPriority } from "@/features/requests/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
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
  useState,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type RequestPriorityPickerBottomSheetRef = {
  open: (selected?: RequestPriority) => void;
  close: () => void;
};

type RequestPriorityPickerBottomSheetProps = {
  onSelect: (priority: RequestPriority) => void;
};

const RequestPriorityPickerBottomSheet = forwardRef<
  RequestPriorityPickerBottomSheetRef,
  RequestPriorityPickerBottomSheetProps
>(function RequestPriorityPickerBottomSheet({ onSelect }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<RequestPriority | undefined>();

  useImperativeHandle(ref, () => ({
    open: (currentSelected) => {
      setSelected(currentSelected);
      bottomSheetRef.current?.present();
    },
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

  const handleSelect = (priority: RequestPriority) => {
    onSelect(priority);
    bottomSheetRef.current?.dismiss();
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
        <Text className="mb-4 text-center text-base font-bold text-heading">
          Select Request Priority
        </Text>

        {REQUEST_PRIORITY_OPTIONS.map((option) => {
          const isSelected = selected === option.id;

          return (
            <Pressable
              key={option.id}
              onPress={() => handleSelect(option.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`mb-2 flex-row items-center gap-3 rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
                isSelected
                  ? "border-primary bg-primary-50"
                  : "border-card-border bg-white"
              }`}
            >
              <View
                className={`size-10 items-center justify-center rounded-full ${option.iconBackground}`}
              >
                <MaterialDesignIcons
                  name={option.icon}
                  color={option.iconColor}
                  size={20}
                />
              </View>

              <Text className="flex-1 text-base font-medium text-heading">
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RequestPriorityPickerBottomSheet;
