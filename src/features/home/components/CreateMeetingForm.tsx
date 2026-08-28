import FormLabel from "@/components/ui/FormLabel";
import FieldError from "@/components/ui/FieldError";
import TimeField from "@/features/home/components/form/TimeField";
import MembersBottomSheet, {
  type MembersBottomSheetRef,
} from "@/features/home/components/MembersBottomSheet";
import DateTimePickerSheet, {
  type DateTimePickerSheetRef,
} from "@/features/home/components/DateTimePickerSheet";
import SelectLocationBottomSheet, {
  type SelectLocationBottomSheetRef,
} from "@/features/home/components/SelectLocationBottomSheet";
import { DUMMY_MEMBERS } from "@/features/home/constants/dummy";
import {
  createMeetingSchema,
  type CreateMeetingFormValues,
} from "@/features/home/schemas/createMeetingSchema";
import type { Member } from "@/features/home/types";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  I18nManager,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "@/theme/colors";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type CreateMeetingFormProps = {
  onSubmit: (values: CreateMeetingFormValues) => void | Promise<void>;
};

export default function CreateMeetingForm({
  onSubmit,
}: CreateMeetingFormProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";

  const dateSheetRef = useRef<DateTimePickerSheetRef>(null);
  const startTimeSheetRef = useRef<DateTimePickerSheetRef>(null);
  const endTimeSheetRef = useRef<DateTimePickerSheetRef>(null);
  const locationSheetRef = useRef<SelectLocationBottomSheetRef>(null);
  const ledBySheetRef = useRef<MembersBottomSheetRef>(null);
  const inviteSheetRef = useRef<MembersBottomSheetRef>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateMeetingFormValues>({
    resolver: zodResolver(createMeetingSchema()),
    defaultValues: {
      title: "",
      agenda: "",
      date: null,
      startTime: null,
      endTime: null,
      location: null,
      ledBy: null,
      isPublic: false,
      invitees: [],
    },
  });

  const date = watch("date");
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const location = watch("location");
  const ledBy = watch("ledBy");
  const invitees = watch("invitees");

  const toggleInvitee = (member: Member) => {
    const isSelected = invitees.some((invitee) => invitee.id === member.id);

    setValue(
      "invitees",
      isSelected
        ? invitees.filter((invitee) => invitee.id !== member.id)
        : [
            ...invitees,
            { id: member.id, name: member.name, email: member.email },
          ],
      { shouldDirty: true },
    );
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 text-2xl font-bold text-heading">
          Create Meeting
        </Text>

        <View className="mb-5">
          <FormLabel label="Title" required />

          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Type meeting title"
                placeholderTextColor={colors.secText}
                className={`rounded-xl border bg-white px-4 text-base text-heading ${
                  errors.title ? "border-rejected-200" : "border-card-border"
                }`}
                style={{
                  textAlign,
                  minHeight: 52,
                  paddingVertical: 14,
                }}
              />
            )}
          />

          <FieldError message={errors.title?.message} />
        </View>

        <View className="mb-5">
          <FormLabel label="Agenda" required />

          <Controller
            control={control}
            name="agenda"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Agenda summary"
                placeholderTextColor={colors.secText}
                multiline
                textAlignVertical="top"
                className={`rounded-xl border bg-white px-4 text-base text-heading ${
                  errors.agenda ? "border-rejected-200" : "border-card-border"
                }`}
                style={{
                  textAlign,
                  minHeight: 120,
                  paddingVertical: 14,
                }}
              />
            )}
          />

          <FieldError message={errors.agenda?.message} />
        </View>

        <View className="mb-5">
          <FormLabel label="Date & Time" required />

          <Pressable
            onPress={() => dateSheetRef.current?.open()}
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.date ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text
              className={`text-base ${
                date ? "text-heading" : "text-sec-text"
              }`}
            >
              {date ? formatDate(date) : "Select Date"}
            </Text>
            <MaterialDesignIcons
              name="calendar-blank-outline"
              color={colors.slate500}
              size={20}
            />
          </Pressable>

          <FieldError message={errors.date?.message} />

          <View className="mt-3 flex-row items-center gap-2">
            <TimeField
              value={startTime}
              placeholder="01:00 PM"
              hasError={Boolean(errors.startTime)}
              onPress={() => startTimeSheetRef.current?.open()}
            />

            <Text className="text-base text-sec-text">—</Text>

            <TimeField
              value={endTime}
              placeholder="03:00 PM"
              hasError={Boolean(errors.startTime)}
              onPress={() => endTimeSheetRef.current?.open()}
            />
          </View>

          <FieldError message={errors.startTime?.message} />
        </View>

        <View className="mb-5">
          <FormLabel label="Location" required />

          <Pressable
            onPress={() => locationSheetRef.current?.open()}
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.location ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text
              numberOfLines={1}
              className={`flex-1 text-base ${
                location ? "text-heading" : "text-sec-text"
              }`}
            >
              {location ? location.value : "Enter Meeting Location"}
            </Text>
            <MaterialDesignIcons name="chevron-down" color={colors.slate500} size={22} />
          </Pressable>

          <FieldError message={errors.location?.message} />
        </View>

        <View className="mb-5">
          <FormLabel label="Led by" required />

          <Pressable
            onPress={() => ledBySheetRef.current?.open()}
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.ledBy ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text
              className={`flex-1 text-base ${
                ledBy ? "text-heading" : "text-sec-text"
              }`}
            >
              {ledBy ? ledBy.name : "Enter Meeting Leader"}
            </Text>
            <MaterialDesignIcons name="chevron-down" color={colors.slate500} size={22} />
          </Pressable>

          <FieldError message={errors.ledBy?.message} />
        </View>

        <Controller
          control={control}
          name="isPublic"
          render={({ field: { value, onChange } }) => (
            <View className="mb-5 flex-row items-center justify-between rounded-xl border border-card-border bg-slate-50 px-4 py-3">
              <View className="flex-1 pr-3">
                <Text className="text-base font-bold text-heading">
                  Make this meeting public
                </Text>
                <Text className="mt-0.5 text-sm text-sec-text">
                  Anyone in this app can view and join this meeting
                </Text>
              </View>

              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: colors.slate200, true: colors.primary300 }}
                thumbColor={value ? colors.primary : colors.white}
              />
            </View>
          )}
        />

        <View className="mb-2">
          <FormLabel label="Send invitations" />

          <Pressable
            onPress={() => inviteSheetRef.current?.open()}
            accessibilityRole="button"
            className="flex-row items-center justify-between rounded-xl border border-card-border bg-slate-50 px-3 py-2.5 active:opacity-[0.92]"
          >
            {invitees.length > 0 ? (
              <View className="flex-1 flex-row flex-wrap gap-2">
                {invitees.map((invitee) => (
                  <View
                    key={invitee.id}
                    className="flex-row items-center gap-1.5 rounded-lg bg-slate-500 px-2.5 py-1.5"
                  >
                    <Text className="text-sm text-white">{invitee.email}</Text>
                    <Pressable
                      onPress={() =>
                        setValue(
                          "invitees",
                          invitees.filter((item) => item.id !== invitee.id),
                          { shouldDirty: true },
                        )
                      }
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${invitee.name}`}
                      hitSlop={8}
                    >
                      <MaterialDesignIcons
                        name="close"
                        color={colors.white}
                        size={14}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="flex-1 px-1 text-base text-sec-text">
                Invite participants
              </Text>
            )}

            <MaterialDesignIcons name="chevron-down" color={colors.slate500} size={22} />
          </Pressable>
        </View>
      </ScrollView>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        accessibilityRole="button"
        className="mt-4 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">Create Meeting</Text>
      </Pressable>

      <DateTimePickerSheet
        ref={dateSheetRef}
        title="Select Meeting Date"
        confirmLabel="Select Meeting Date"
        mode="date"
        value={date}
        minimumDate={new Date()}
        onConfirm={(selected) =>
          setValue("date", selected, { shouldDirty: true })
        }
      />

      <DateTimePickerSheet
        ref={startTimeSheetRef}
        title="Select Meeting Time"
        confirmLabel="Select Meeting Start Time"
        mode="time"
        value={startTime}
        onConfirm={(selected) =>
          setValue("startTime", selected, { shouldDirty: true })
        }
      />

      <DateTimePickerSheet
        ref={endTimeSheetRef}
        title="Select Meeting Time"
        confirmLabel="Select Meeting End Time"
        mode="time"
        value={endTime}
        onConfirm={(selected) =>
          setValue("endTime", selected, { shouldDirty: true })
        }
      />

      <SelectLocationBottomSheet
        ref={locationSheetRef}
        value={location}
        onConfirm={(selected) =>
          setValue("location", selected, { shouldDirty: true })
        }
      />

      <MembersBottomSheet
        ref={ledBySheetRef}
        title="Led by"
        searchPlaceholder="search name or email"
        members={DUMMY_MEMBERS}
        selectedIds={ledBy ? [ledBy.id] : []}
        onSelect={(member) =>
          setValue(
            "ledBy",
            { id: member.id, name: member.name, email: member.email },
            { shouldDirty: true },
          )
        }
      />

      <MembersBottomSheet
        ref={inviteSheetRef}
        title="Invite Participants"
        searchPlaceholder="Invite participants by name or email"
        members={DUMMY_MEMBERS}
        selectedIds={invitees.map((invitee) => invitee.id)}
        multiSelect
        onSelect={toggleInvitee}
      />
    </View>
  );
}
