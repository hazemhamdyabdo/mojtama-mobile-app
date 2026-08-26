import { REQUEST_TYPE_OPTIONS } from "@/features/requests/constants/dummy";
import type { RequestType } from "@/features/requests/types";
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

export type RequestTypePickerBottomSheetRef = {
  open: (selected?: RequestType) => void;
  close: () => void;
};

type RequestTypePickerBottomSheetProps = {
  onSelect: (requestType: RequestType) => void;
};

const RequestTypePickerBottomSheet = forwardRef<
  RequestTypePickerBottomSheetRef,
  RequestTypePickerBottomSheetProps
>(function RequestTypePickerBottomSheet({ onSelect }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<RequestType | undefined>();

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

  const handleSelect = (requestType: RequestType) => {
    onSelect(requestType);
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
          Select Request Type
        </Text>

        {REQUEST_TYPE_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            onPress={() => handleSelect(option.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: selected === option.id }}
            className={`mb-2 flex-row items-center gap-3 rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
              selected === option.id
                ? "border-[#7B61FF] bg-[#F8F6FF]"
                : "border-[#E4E4E7] bg-white"
            }`}
          >
            <View
              className={`size-10 items-center justify-center rounded-full ${
                option.id === "emergency" ? "bg-[#FEE2E2]" : "bg-[#F0EDFF]"
              }`}
            >
              <MaterialDesignIcons
                name={option.icon}
                color={option.iconColor ?? "#7B61FF"}
                size={20}
              />
            </View>
            <Text className="flex-1 text-base font-medium text-[#1F1F1F]">
              {option.label}
            </Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RequestTypePickerBottomSheet;
