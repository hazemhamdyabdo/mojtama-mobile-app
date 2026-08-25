import {
  VISIBILITY_OPTIONS,
  type VisibilityOption,
} from "@/features/home/constants/visibilityOptions";
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
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type VisibilityBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type VisibilityBottomSheetProps = {
  value: VisibilityOption;
  onSelect: (value: VisibilityOption) => void;
};

type VisibilityRowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function VisibilityRow({ label, selected, onPress }: VisibilityRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
        selected ? "border-[#7B61FF] bg-[#F8F6FF]" : "border-[#E4E4E7] bg-white"
      }`}
    >
      <Text className="text-base font-medium text-[#1F1F1F]">{label}</Text>
      {selected ? (
        <View className="size-6 items-center justify-center rounded-full bg-[#7B61FF]">
          <MaterialDesignIcons name="check-bold" color="#FFFFFF" size={14} />
        </View>
      ) : null}
    </Pressable>
  );
}

const VisibilityBottomSheet = forwardRef<
  VisibilityBottomSheetRef,
  VisibilityBottomSheetProps
>(function VisibilityBottomSheet({ value, onSelect }, ref) {
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

  const handleSelect = (option: VisibilityOption) => {
    onSelect(option);
    bottomSheetRef.current?.dismiss();
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
        <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
          Visibility
        </Text>

        {VISIBILITY_OPTIONS.map((option) => (
          <VisibilityRow
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onPress={() => handleSelect(option.id)}
          />
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default VisibilityBottomSheet;
