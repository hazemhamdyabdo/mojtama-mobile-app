import { REQUEST_LOCATIONS } from "@/features/requests/constants/dummy";
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

export type RequestLocationPickerBottomSheetRef = {
  open: (selected?: string) => void;
  close: () => void;
};

type RequestLocationPickerBottomSheetProps = {
  onSelect: (location: string) => void;
};

const RequestLocationPickerBottomSheet = forwardRef<
  RequestLocationPickerBottomSheetRef,
  RequestLocationPickerBottomSheetProps
>(function RequestLocationPickerBottomSheet({ onSelect }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | undefined>();

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

  const handleSelect = (location: string) => {
    onSelect(location);
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
          Select Location
        </Text>

        {REQUEST_LOCATIONS.map((location) => (
          <Pressable
            key={location}
            onPress={() => handleSelect(location)}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === location }}
            className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
              selected === location
                ? "border-[#7B61FF] bg-[#F8F6FF]"
                : "border-[#E4E4E7] bg-white"
            }`}
          >
            <Text className="text-base font-medium text-[#1F1F1F]">{location}</Text>
            {selected === location ? (
              <View className="size-6 items-center justify-center rounded-full bg-[#7B61FF]">
                <MaterialDesignIcons name="check-bold" color="#FFFFFF" size={14} />
              </View>
            ) : null}
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RequestLocationPickerBottomSheet;
