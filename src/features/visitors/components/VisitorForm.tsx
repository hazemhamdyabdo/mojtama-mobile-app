import { colors } from "@/theme/colors";
import DateTimePickerSheet, {
  type DateTimePickerSheetRef,
} from "@/features/home/components/DateTimePickerSheet";
import VisitorFormSelectField from "@/features/visitors/components/VisitorFormSelectField";
import VisitorFormTextField from "@/features/visitors/components/VisitorFormTextField";
import VisitorOptionPickerBottomSheet, {
  type VisitorOptionPickerBottomSheetRef,
} from "@/features/visitors/components/VisitorOptionPickerBottomSheet";
import {
  VISITOR_BUILDINGS,
  VISITOR_GATES,
  VISITOR_PARKING_SPOTS,
  VISITOR_PURPOSES,
  VISITOR_UNITS,
} from "@/features/visitors/constants/dummy";
import {
  visitorSchema,
  type VisitorFormValues,
} from "@/features/visitors/schemas/visitorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatVisitDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatVisitTime(date: Date): string {
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;
}

const EMPTY_VALUES: VisitorFormValues = {
  name: "",
  building: "",
  unit: "",
  gate: "",
  parkingSpot: "",
  purpose: "",
  date: "",
  time: "",
  phone: "",
  email: "",
};

type VisitorFormProps = {
  defaultValues?: VisitorFormValues;
  submitLabel: string;
  onSubmit: (values: VisitorFormValues) => void;
  onDelete?: () => void;
};

export default function VisitorForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
}: VisitorFormProps) {
  const optionPickerRef = useRef<VisitorOptionPickerBottomSheetRef>(null);
  const datePickerRef = useRef<DateTimePickerSheetRef>(null);
  const timePickerRef = useRef<DateTimePickerSheetRef>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const values = watch();

  const openOptionPicker = (
    field: "building" | "unit" | "gate" | "parkingSpot" | "purpose",
    title: string,
    options: string[],
  ) => {
    optionPickerRef.current?.open({
      title,
      options,
      selected: values[field],
      onSelect: (option) =>
        setValue(field, option, { shouldValidate: true }),
    });
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-base font-bold text-heading">
          Visit Details
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <VisitorFormTextField
              label="Visitor name"
              required
              error={errors.name?.message}
              inputProps={{
                value,
                onChangeText: onChange,
                onBlur,
                placeholder: "Enter visitor name",
              }}
            />
          )}
        />

        <View className="flex-row gap-3">
          <VisitorFormSelectField
            label="Building"
            required
            placeholder="Select Building"
            value={values.building}
            error={errors.building?.message}
            onPress={() =>
              openOptionPicker("building", "Select Building", VISITOR_BUILDINGS)
            }
          />
          <VisitorFormSelectField
            label="Unit"
            required
            placeholder="Select Unit"
            value={values.unit}
            error={errors.unit?.message}
            onPress={() => openOptionPicker("unit", "Select Unit", VISITOR_UNITS)}
          />
        </View>

        <View className="flex-row gap-3">
          <VisitorFormSelectField
            label="Gate"
            required
            placeholder="Select Gate"
            value={values.gate}
            error={errors.gate?.message}
            onPress={() => openOptionPicker("gate", "Select Gate", VISITOR_GATES)}
          />
          <VisitorFormSelectField
            label="Parking Spot"
            required
            placeholder="Select Parking"
            value={values.parkingSpot}
            error={errors.parkingSpot?.message}
            onPress={() =>
              openOptionPicker(
                "parkingSpot",
                "Select Parking Spot",
                VISITOR_PARKING_SPOTS,
              )
            }
          />
        </View>

        <VisitorFormSelectField
          label="Purpose of visit"
          required
          placeholder="Family visit"
          value={values.purpose}
          error={errors.purpose?.message}
          onPress={() =>
            openOptionPicker("purpose", "Purpose Of Visit", VISITOR_PURPOSES)
          }
        />

        <Text className="mb-4 mt-2 text-base font-bold text-heading">
          Date & Duration
        </Text>

        <VisitorFormSelectField
          label="Preferred Date for Visit"
          required
          placeholder="mm/dd/yyyy"
          value={values.date}
          error={errors.date?.message}
          icon="calendar-blank-outline"
          onPress={() => datePickerRef.current?.open()}
        />

        <VisitorFormSelectField
          label="Preferred Time for Visit"
          required
          placeholder="02:00 PM - 02:00 AM"
          value={values.time}
          error={errors.time?.message}
          icon="clock-outline"
          onPress={() => timePickerRef.current?.open()}
        />

        <Text className="mb-4 mt-2 text-base font-bold text-heading">
          Contact Information
        </Text>

        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <VisitorFormTextField
              label="Phone number"
              required
              error={errors.phone?.message}
              inputProps={{
                value,
                onChangeText: onChange,
                onBlur,
                placeholder: "exp:(555) 123-4567",
                keyboardType: "phone-pad",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <VisitorFormTextField
              label="Email address"
              optionalHint
              error={errors.email?.message}
              inputProps={{
                value: value ?? "",
                onChangeText: onChange,
                onBlur,
                placeholder: "Johndoe@gmail.com",
                keyboardType: "email-address",
                autoCapitalize: "none",
              }}
            />
          )}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          accessibilityRole="button"
          className="mt-2 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">{submitLabel}</Text>
        </Pressable>

        {onDelete ? (
          <Pressable
            onPress={onDelete}
            accessibilityRole="button"
            className="mt-3 flex-row items-center justify-center gap-2 rounded-2xl border border-rejected-500 bg-white py-4 active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name="trash-can-outline"
              color={colors.rejected}
              size={20}
            />
            <Text className="text-base font-bold text-rejected-500">
              Delete Visit
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <VisitorOptionPickerBottomSheet ref={optionPickerRef} />

      <DateTimePickerSheet
        ref={datePickerRef}
        title="Preferred Date for Visit"
        confirmLabel="Confirm"
        mode="date"
        value={null}
        minimumDate={new Date()}
        onConfirm={(date) =>
          setValue("date", formatVisitDate(date), { shouldValidate: true })
        }
      />

      <DateTimePickerSheet
        ref={timePickerRef}
        title="Preferred Time for Visit"
        confirmLabel="Confirm"
        mode="time"
        value={null}
        onConfirm={(date) =>
          setValue("time", formatVisitTime(date), { shouldValidate: true })
        }
      />
    </View>
  );
}
