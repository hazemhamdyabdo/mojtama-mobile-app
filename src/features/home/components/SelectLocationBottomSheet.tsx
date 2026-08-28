import { colors } from "@/theme/colors";
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
import { useTranslation } from "react-i18next";
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
        selected ? "border-primary bg-primary-50" : "border-card-border bg-white"
      }`}
    >
      <View className="size-12 items-center justify-center rounded-full bg-primary-50">
        <MaterialDesignIcons name={icon} color={colors.primary} size={24} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-heading">{title}</Text>
        <Text className="mt-0.5 text-sm text-sec-text">{subtitle}</Text>
      </View>

      {selected ? (
        <View className="size-7 items-center justify-center rounded-full bg-primary">
          <MaterialDesignIcons name="check-bold" color={colors.white} size={16} />
        </View>
      ) : null}
    </Pressable>
  );
}

const SelectLocationBottomSheet = forwardRef<
  SelectLocationBottomSheetRef,
  SelectLocationBottomSheetProps
>(function SelectLocationBottomSheet({ value, onConfirm }, ref) {
  const { t } = useTranslation();
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
          {t("home.location.title")}
        </Text>

        <View className="gap-3">
          <LocationOption
            icon="video-outline"
            title={t("home.location.virtual.title")}
            subtitle={t("home.location.virtual.subtitle")}
            selected={isVirtual}
            onPress={() => handleSelectType("virtual")}
          />

          <LocationOption
            icon="map-marker-outline"
            title={t("home.location.inPerson.title")}
            subtitle={t("home.location.inPerson.subtitle")}
            selected={!isVirtual}
            onPress={() => handleSelectType("in-person")}
          />
        </View>

        <View className="mt-5">
          <Text className="mb-2 text-sm font-medium text-label">
            {isVirtual
              ? t("home.location.linkLabel")
              : t("home.location.locationLabel")}
          </Text>

          <View className="flex-row items-center rounded-xl border border-card-border bg-white px-4">
            <BottomSheetTextInput
              value={draftValue}
              onChangeText={setDraftValue}
              placeholder={
                isVirtual
                  ? t("home.location.linkPlaceholder")
                  : t("home.location.locationPlaceholder")
              }
              placeholderTextColor={colors.secText}
              autoCapitalize="none"
              keyboardType={isVirtual ? "url" : "default"}
              style={{
                flex: 1,
                textAlign,
                minHeight: 52,
                paddingVertical: 14,
                fontSize: 16,
                color: colors.heading,
              }}
            />

            <MaterialDesignIcons
              name={isVirtual ? "content-copy" : "map-marker-outline"}
              color={colors.secText}
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
          className="mt-5 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-50"
        >
          <Text className="text-base font-bold text-white">
            {t("home.location.confirm")}
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default SelectLocationBottomSheet;
