import { colors } from "@/theme/colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type DateTimePickerSheetRef = {
  open: () => void;
  close: () => void;
};

type DateTimePickerSheetProps = {
  title: string;
  confirmLabel: string;
  mode: "date" | "time";
  value: Date | null;
  minimumDate?: Date;
  onConfirm: (date: Date) => void;
};

const DateTimePickerSheet = forwardRef<
  DateTimePickerSheetRef,
  DateTimePickerSheetProps
>(function DateTimePickerSheet(
  { title, confirmLabel, mode, value, minimumDate, onConfirm },
  ref,
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<Date>(value ?? new Date());
  // Android renders the native dialog instead of an embedded picker.
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setDraft(value ?? new Date());

      if (Platform.OS === "android") {
        setShowAndroidPicker(true);
      } else {
        bottomSheetRef.current?.present();
      }
    },
    close: () => {
      setShowAndroidPicker(false);
      bottomSheetRef.current?.dismiss();
    },
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

  if (Platform.OS === "android") {
    if (!showAndroidPicker) {
      return null;
    }

    return (
      <DateTimePicker
        value={draft}
        mode={mode}
        minimumDate={minimumDate}
        onValueChange={(_event, selectedDate) => {
          setShowAndroidPicker(false);

          if (selectedDate) {
            onConfirm(selectedDate);
          }
        }}
        onDismiss={() => setShowAndroidPicker(false)}
      />
    );
  }

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
          {title}
        </Text>

        <View className="items-center">
          <DateTimePicker
            value={draft}
            mode={mode}
            display={mode === "date" ? "inline" : "spinner"}
            minimumDate={minimumDate}
            themeVariant="light"
            accentColor={colors.primary}
            style={mode === "date" ? { width: "100%" } : undefined}
            onValueChange={(_event, selectedDate) => {
              if (selectedDate) {
                setDraft(selectedDate);
              }
            }}
          />
        </View>

        <Pressable
          onPress={() => {
            onConfirm(draft);
            bottomSheetRef.current?.dismiss();
          }}
          accessibilityRole="button"
          className="mt-4 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">{confirmLabel}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DateTimePickerSheet;
