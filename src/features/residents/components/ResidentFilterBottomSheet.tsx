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
      "Select Building",
    );
  };

  const openUnitPicker = () => {
    activeFieldRef.current = "unit";
    optionPickerRef.current?.open(
      RESIDENT_UNITS.map((unit) => ({ id: unit, label: unit })),
      draft.unit,
      "Select Unit",
    );
  };

  const openRolePicker = () => {
    activeFieldRef.current = "role";
    optionPickerRef.current?.open(
      RESIDENT_ROLE_OPTIONS.map((role) => ({ id: role.id, label: role.label })),
      draft.role,
      "Select Role",
    );
  };

  const roleLabel =
    RESIDENT_ROLE_OPTIONS.find((role) => role.id === draft.role)?.label ?? "";

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
            Filter Residents
          </Text>

          <FilterField
            label="Building"
            value={draft.building}
            placeholder="select building"
            onPress={openBuildingPicker}
          />
          <FilterField
            label="Unit"
            value={draft.unit}
            placeholder="select unit"
            onPress={openUnitPicker}
          />
          <FilterField
            label="Role"
            value={roleLabel}
            placeholder="select role"
            onPress={openRolePicker}
          />

          <View className="mt-2 flex-row gap-3">
            <Pressable
              onPress={handleReset}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-input-text bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-slate-500">Reset</Text>
            </Pressable>

            <Pressable
              onPress={handleApply}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">Apply Filters</Text>
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
