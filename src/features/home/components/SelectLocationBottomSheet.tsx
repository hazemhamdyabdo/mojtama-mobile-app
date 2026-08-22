import type { MeetingLocation } from "@/features/home/schemas/createMeetingSchema";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { I18nManager, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SelectLocationBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type SelectLocationBottomSheetProps = {
  value: MeetingLocation | null;
  onConfirm: (location: MeetingLocation) => void;
};

type LocationType = MeetingLocation["type"];

type LocationOptionProps = {
  icon: ComponentProps<typeof MaterialDesignIcons>["name"];
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
};

function LocationOption({
  icon,
  title,
  subtitle,
  selected,
  onPress,
}: LocationOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={`flex-row items-center gap-3 rounded-2xl border p-4 active:opacity-[0.92] ${
        selected ? "border-[#7B61FF] bg-[#F8F6FF]" : "border-[#E4E4E7] bg-white"
      }`}
    >
      <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
        <MaterialDesignIcons name={icon} color="#7B61FF" size={24} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-[#1F1F1F]">{title}</Text>
        <Text className="mt-0.5 text-sm text-[#90A1B9]">{subtitle}</Text>
      </View>

      {selected ? (
        <View className="size-7 items-center justify-center rounded-full bg-[#7B61FF]">
          <MaterialDesignIcons name="check-bold" color="#FFFFFF" size={16} />
        </View>
      ) : null}
    </Pressable>
  );
}

const SelectLocationBottomSheet = forwardRef<
  SelectLocationBottomSheetRef,
  SelectLocationBottomSheetProps
>(function SelectLocationBottomSheet({ value, onConfirm }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const textAlign = I18nManager.isRTL ? "right" : "left";

  const [draftType, setDraftType] = useState<LocationType>("virtual");
  const [draftValue, setDraftValue] = useState("");

  useImperativeHandle(ref, () => ({
    open: () => {
      setDraftType(value?.type ?? "virtual");
      setDraftValue(value?.value ?? "");
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

  const handleSelectType = (type: LocationType) => {
    if (type !== draftType) {
      setDraftType(type);
      setDraftValue("");
    }
  };

  const canConfirm = draftValue.trim().length > 0;
  const isVirtual = draftType === "virtual";

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
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

        <View className="gap-3">
          <LocationOption
            icon="video-outline"
            title="Virtual Meeting"
            subtitle="Connect via video call"
            selected={isVirtual}
            onPress={() => handleSelectType("virtual")}
          />

          <LocationOption
            icon="map-marker-outline"
            title="In-person Meeting"
            subtitle="Meet at a physical location"
            selected={!isVirtual}
            onPress={() => handleSelectType("in-person")}
          />
        </View>

        <View className="mt-5">
          <Text className="mb-2 text-sm font-medium text-[#2E2E2E]">
            {isVirtual ? "Meeting link" : "Meeting location"}
          </Text>

          <View className="flex-row items-center rounded-xl border border-[#E4E4E7] bg-white px-4">
            <BottomSheetTextInput
              value={draftValue}
              onChangeText={setDraftValue}
              placeholder={
                isVirtual ? "Enter meeting link" : "Enter meeting location"
              }
              placeholderTextColor="#90A1B9"
              autoCapitalize="none"
              keyboardType={isVirtual ? "url" : "default"}
              style={{
                flex: 1,
                textAlign,
                minHeight: 52,
                paddingVertical: 14,
                fontSize: 16,
                color: "#1F1F1F",
              }}
            />

            <MaterialDesignIcons
              name={isVirtual ? "content-copy" : "map-marker-outline"}
              color="#90A1B9"
              size={18}
            />
          </View>
        </View>

        <Pressable
          onPress={() => {
            onConfirm({ type: draftType, value: draftValue.trim() });
            bottomSheetRef.current?.dismiss();
          }}
          disabled={!canConfirm}
          accessibilityRole="button"
          className="mt-5 items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-50"
        >
          <Text className="text-base font-bold text-white">Add Location</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default SelectLocationBottomSheet;
