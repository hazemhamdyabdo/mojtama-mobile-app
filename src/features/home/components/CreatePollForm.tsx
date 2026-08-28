import FormLabel from "@/components/ui/FormLabel";
import SettingToggle from "@/features/home/components/form/SettingToggle";
import { colors } from "@/theme/colors";
import {
  createPollSchema,
  POLL_FORM_LIMITS,
  type CreatePollFormValues,
} from "@/features/home/schemas/createPollSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  I18nManager,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

type CreatePollFormProps = {
  onSubmit: (values: CreatePollFormValues) => void | Promise<void>;
};

export default function CreatePollForm({ onSubmit }: CreatePollFormProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePollFormValues>({
    resolver: zodResolver(createPollSchema()),
    defaultValues: {
      title: "",
      deadlineDate: null,
      deadlineTime: null,
      isEmergency: true,
      options: [{ label: "" }, { label: "" }],
      allowMembersToAddOptions: true,
      allowMultipleChoice: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-6 text-2xl font-bold text-heading">
          Create Poll
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
                placeholder="Type Announcement title"
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

          {errors.title ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.title.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-5">
          <FormLabel label="Deadline" />

          <View className="flex-row gap-3">
            <Controller
              control={control}
              name="deadlineDate"
              render={({ field: { value, onChange } }) => (
                <View className="flex-1">
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    accessibilityRole="button"
                    className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
                      errors.deadlineDate
                        ? "border-rejected-200"
                        : "border-card-border"
                    }`}
                  >
                    <Text
                      className={`text-base ${
                        value ? "text-heading" : "text-sec-text"
                      }`}
                    >
                      {value ? formatDate(value) : "Select Date"}
                    </Text>
                    <MaterialDesignIcons
                      name="calendar-blank-outline"
                      color={colors.slate500}
                      size={20}
                    />
                  </Pressable>

                  {showDatePicker ? (
                    <DateTimePicker
                      value={value ?? new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onValueChange={(_event, selectedDate) => {
                        onChange(selectedDate);

                        if (Platform.OS === "android") {
                          setShowDatePicker(false);
                        }
                      }}
                      onDismiss={() => setShowDatePicker(false)}
                    />
                  ) : null}
                </View>
              )}
            />

            <Controller
              control={control}
              name="deadlineTime"
              render={({ field: { value, onChange } }) => (
                <View className="flex-1">
                  <Pressable
                    onPress={() => setShowTimePicker(true)}
                    accessibilityRole="button"
                    className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
                      errors.deadlineTime
                        ? "border-rejected-200"
                        : "border-card-border"
                    }`}
                  >
                    <Text
                      className={`text-base ${
                        value ? "text-heading" : "text-sec-text"
                      }`}
                    >
                      {value ? formatTime(value) : "Select Time"}
                    </Text>
                    <MaterialDesignIcons
                      name="clock-outline"
                      color={colors.slate500}
                      size={20}
                    />
                  </Pressable>

                  {showTimePicker ? (
                    <DateTimePicker
                      value={value ?? new Date()}
                      mode="time"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onValueChange={(_event, selectedTime) => {
                        onChange(selectedTime);

                        if (Platform.OS === "android") {
                          setShowTimePicker(false);
                        }
                      }}
                      onDismiss={() => setShowTimePicker(false)}
                    />
                  ) : null}
                </View>
              )}
            />
          </View>

          {errors.deadlineDate ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.deadlineDate.message}
            </Text>
          ) : null}
        </View>

        <Controller
          control={control}
          name="isEmergency"
          render={({ field: { value, onChange } }) => (
            <View className="mb-5 flex-col items-start rounded-xl border border-card-border bg-slate-50 px-4 py-3">
              <View className="flex-row items-center">
                <View className="size-10 items-center justify-center rounded-full">
                  <MaterialDesignIcons
                    name="alert-outline"
                    color={colors.primary}
                    size={22}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-base font-bold text-heading">
                    Emergency Feed
                  </Text>
                </View>

                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: colors.slate200, true: colors.primary300 }}
                  thumbColor={value ? colors.primary : colors.white}
                />
              </View>
              <Text className="text-sm text-sec-text">
                Mark as Urgent for immediate attention
              </Text>
            </View>
          )}
        />

        <View className="mb-5">
          <FormLabel label="Poll options" />

          <View className="gap-3">
            {fields.map((field, index) => (
              <View key={field.id} className="flex-row items-center gap-2">
                <View className="size-5 rounded-full border-2 border-slate-300" />

                <Controller
                  control={control}
                  name={`options.${index}.label`}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder={`Option ${index + 1}`}
                      placeholderTextColor={colors.secText}
                      className={`flex-1 rounded-xl border bg-white px-4 py-3 text-base text-heading ${
                        errors.options?.[index]?.label
                          ? "border-rejected-200"
                          : "border-card-border"
                      }`}
                      style={{ textAlign }}
                    />
                  )}
                />

                <Pressable
                  onPress={() =>
                    fields.length > POLL_FORM_LIMITS.minOptions && remove(index)
                  }
                  disabled={fields.length <= POLL_FORM_LIMITS.minOptions}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove option ${index + 1}`}
                  className="size-8 items-center justify-center active:opacity-[0.92] disabled:opacity-30"
                >
                  <MaterialDesignIcons name="close" color={colors.slate500} size={20} />
                </Pressable>
              </View>
            ))}
          </View>

          {errors.options?.root ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.options.root.message}
            </Text>
          ) : null}

          {errors.options?.message ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.options.message}
            </Text>
          ) : null}

          <Pressable
            onPress={() => append({ label: "" })}
            disabled={fields.length >= POLL_FORM_LIMITS.maxOptions}
            accessibilityRole="button"
            className="mt-3 flex-row items-center justify-center gap-2 rounded-xl border border-primary py-3 active:opacity-[0.92] disabled:opacity-50"
          >
            <MaterialDesignIcons name="plus" color={colors.primary} size={20} />
            <Text className="text-base font-semibold text-primary">
              Add Option
            </Text>
          </Pressable>
        </View>

        <View className="mb-2">
          <FormLabel label="Settings" className="mb-0" />

          <View className="rounded-xl  bg-white  ">
            <Controller
              control={control}
              name="allowMembersToAddOptions"
              render={({ field: { value, onChange } }) => (
                <SettingToggle
                  label="Allow members to add options"
                  value={value}
                  onChange={onChange}
                  showDivider
                />
              )}
            />

            <Controller
              control={control}
              name="allowMultipleChoice"
              render={({ field: { value, onChange } }) => (
                <SettingToggle
                  label="Allow people to choose multiple option"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        accessibilityRole="button"
        className="mt-4 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">Create Poll</Text>
      </Pressable>
    </View>
  );
}
