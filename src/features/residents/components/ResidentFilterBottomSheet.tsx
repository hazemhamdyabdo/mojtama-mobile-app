import FilterOptionPickerBottomSheet, {
  type FilterOptionPickerBottomSheetRef,
} from "@/features/residents/components/FilterOptionPickerBottomSheet";
import {
  RESIDENT_BUILDINGS,
  RESIDENT_ROLE_OPTIONS,
  RESIDENT_UNITS,
} from "@/features/residents/constants/dummy";
import type { ResidentFilterCriteria } from "@/features/residents/types";
import { EMPTY_RESIDENT_FILTER } from "@/features/residents/types";
import { translateLabel } from "@/localization/translateLabel";
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
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export type ResidentFilterBottomSheetRef = {
  open: (current?: ResidentFilterCriteria) => void;
  close: () => void;
};

type ResidentFilterBottomSheetProps = {
  onApply: (criteria: ResidentFilterCriteria) => void;
};

type FilterFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onPress: () => void;
};

function FilterField({ label, value, placeholder, onPress }: FilterFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-heading">{label}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        className="flex-row items-center justify-between rounded-xl border border-card-border bg-white px-4 py-3.5 active:opacity-[0.92]"
      >
        <Text className={`text-base ${value ? "text-heading" : "text-sec-text"}`}>
          {value || placeholder}
        </Text>
        <MaterialDesignIcons name="chevron-down" color={colors.secText} size={20} />
      </Pressable>
    </View>
  );
}

const ResidentFilterBottomSheet = forwardRef<
  ResidentFilterBottomSheetRef,
  ResidentFilterBottomSheetProps
>(function ResidentFilterBottomSheet({ onApply }, ref) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const optionPickerRef = useRef<FilterOptionPickerBottomSheetRef>(null);
  const activeFieldRef = useRef<"building" | "unit" | "role" | null>(null);
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<ResidentFilterCriteria>(EMPTY_RESIDENT_FILTER);

  useImperativeHandle(ref, () => ({
    open: (current) => {
      setDraft(current ?? EMPTY_RESIDENT_FILTER);
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

  const handleOptionSelect = (optionId: string) => {
    const field = activeFieldRef.current;

    if (!field) {
      return;
    }

    setDraft((current) => ({
      ...current,
      [field]: optionId,
    }));
    activeFieldRef.current = null;
  };

  const openBuildingPicker = () => {
    activeFieldRef.current = "building";
    optionPickerRef.current?.open(
      RESIDENT_BUILDINGS.map((building) => ({ id: building, label: building })),
      draft.building,
      t("residents.filter.selectBuilding"),
    );
  };

  const openUnitPicker = () => {
    activeFieldRef.current = "unit";
    optionPickerRef.current?.open(
      RESIDENT_UNITS.map((unit) => ({ id: unit, label: unit })),
      draft.unit,
      t("residents.filter.selectUnit"),
    );
  };

  const openRolePicker = () => {
    activeFieldRef.current = "role";
    optionPickerRef.current?.open(
      RESIDENT_ROLE_OPTIONS.map((role) => ({
        id: role.id,
        label: translateLabel(t, "residents.roles", role.id),
      })),
      draft.role,
      t("residents.filter.selectRole"),
    );
  };

  const roleLabel = draft.role
    ? translateLabel(t, "residents.roles", draft.role)
    : "";

  const handleReset = () => {
    setDraft(EMPTY_RESIDENT_FILTER);
  };

  const handleApply = () => {
    onApply(draft);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <>
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
          <Text className="mb-5 text-center text-base font-bold text-heading">
            {t("residents.filter.title")}
          </Text>

          <FilterField
            label={t("residents.filter.building")}
            value={draft.building}
            placeholder={t("residents.filter.selectBuilding")}
            onPress={openBuildingPicker}
          />
          <FilterField
            label={t("residents.filter.unit")}
            value={draft.unit}
            placeholder={t("residents.filter.selectUnit")}
            onPress={openUnitPicker}
          />
          <FilterField
            label={t("residents.filter.role")}
            value={roleLabel}
            placeholder={t("residents.filter.selectRole")}
            onPress={openRolePicker}
          />

          <View className="mt-2 flex-row gap-3">
            <Pressable
              onPress={handleReset}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-input-text bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-slate-500">{t("common.reset")}</Text>
            </Pressable>

            <Pressable
              onPress={handleApply}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">
                {t("common.applyFilters")}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <FilterOptionPickerBottomSheet
        ref={optionPickerRef}
        onSelect={handleOptionSelect}
      />
    </>
  );
});

export default ResidentFilterBottomSheet;
