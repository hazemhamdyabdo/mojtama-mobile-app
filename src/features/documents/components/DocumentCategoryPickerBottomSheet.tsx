import {
  DOCUMENT_CATEGORIES,
  DOCUMENT_CATEGORY_LABELS,
} from "@/features/documents/constants/dummy";
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

export type DocumentCategoryPickerConfig = {
  selected?: string;
  onSelect: (category: string) => void;
};

export type DocumentCategoryPickerBottomSheetRef = {
  open: (config: DocumentCategoryPickerConfig) => void;
  close: () => void;
};

const DocumentCategoryPickerBottomSheet = forwardRef<
  DocumentCategoryPickerBottomSheetRef
>(function DocumentCategoryPickerBottomSheet(_props, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [config, setConfig] = useState<DocumentCategoryPickerConfig | null>(
    null,
  );

  useImperativeHandle(ref, () => ({
    open: (nextConfig) => {
      setConfig(nextConfig);
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

  const handleSelect = (category: string) => {
    config?.onSelect(category);
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
          Select Category
        </Text>

        {DOCUMENT_CATEGORIES.map((category) => {
          const isSelected = config?.selected === category;

          return (
            <Pressable
              key={category}
              onPress={() => handleSelect(category)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-3.5 active:opacity-[0.92] ${
                isSelected
                  ? "border-[#7B61FF] bg-[#F8F6FF]"
                  : "border-[#E4E4E7] bg-white"
              }`}
            >
              <Text className="text-base font-medium text-[#1F1F1F]">
                {DOCUMENT_CATEGORY_LABELS[category]}
              </Text>
              {isSelected ? (
                <View className="size-6 items-center justify-center rounded-full bg-[#7B61FF]">
                  <MaterialDesignIcons
                    name="check-bold"
                    color="#FFFFFF"
                    size={14}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DocumentCategoryPickerBottomSheet;
