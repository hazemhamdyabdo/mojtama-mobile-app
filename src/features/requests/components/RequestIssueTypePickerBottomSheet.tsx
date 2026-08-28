import { colors } from "@/theme/colors";
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

type IssueTypeOption = {
  id: string;
  label: string;
};

export type RequestIssueTypePickerBottomSheetRef = {
  open: (options: IssueTypeOption[], selected?: string) => void;
  close: () => void;
};

type RequestIssueTypePickerBottomSheetProps = {
  onSelect: (issueTypeId: string) => void;
};

const RequestIssueTypePickerBottomSheet = forwardRef<
  RequestIssueTypePickerBottomSheetRef,
  RequestIssueTypePickerBottomSheetProps
>(function RequestIssueTypePickerBottomSheet({ onSelect }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [options, setOptions] = useState<IssueTypeOption[]>([]);
  const [selected, setSelected] = useState<string | undefined>();

  useImperativeHandle(ref, () => ({
    open: (nextOptions, currentSelected) => {
      setOptions(nextOptions);
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

  const handleSelect = (issueTypeId: string) => {
    onSelect(issueTypeId);
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
          Select Issue Type
        </Text>

        {options.map((option) => (
          <Pressable
            key={option.id}
            onPress={() => handleSelect(option.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === option.id }}
            className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
              selected === option.id
                ? "border-primary bg-primary-50"
                : "border-card-border bg-white"
            }`}
          >
            <Text className="text-base font-medium text-heading">
              {option.label}
            </Text>
            {selected === option.id ? (
              <View className="size-6 items-center justify-center rounded-full bg-primary">
                <MaterialDesignIcons name="check-bold" color={colors.white} size={14} />
              </View>
            ) : null}
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RequestIssueTypePickerBottomSheet;
