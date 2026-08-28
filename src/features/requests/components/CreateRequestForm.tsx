import { colors } from "@/theme/colors";
import RequestIssueTypeGrid from "@/features/requests/components/RequestIssueTypeGrid";
import RequestIssueTypePickerBottomSheet, {
  type RequestIssueTypePickerBottomSheetRef,
} from "@/features/requests/components/RequestIssueTypePickerBottomSheet";
import RequestLocationPickerBottomSheet, {
  type RequestLocationPickerBottomSheetRef,
} from "@/features/requests/components/RequestLocationPickerBottomSheet";
import RequestPriorityPickerBottomSheet, {
  type RequestPriorityPickerBottomSheetRef,
} from "@/features/requests/components/RequestPriorityPickerBottomSheet";
import RequestTypePickerBottomSheet, {
  type RequestTypePickerBottomSheetRef,
} from "@/features/requests/components/RequestTypePickerBottomSheet";
import {
  EMERGENCY_ISSUE_TYPES,
  getIssueTypeOptionsForRequestType,
  MAINTENANCE_ISSUE_TYPES,
} from "@/features/requests/constants/dummy";
import {
  createRequestSchema,
  editRequestSchema,
  type CreateRequestFormValues,
} from "@/features/requests/schemas/createRequestSchema";
import type { RequestIssueType, RequestPriority, RequestType } from "@/features/requests/types";
import { translateLabel } from "@/localization/translateLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type CreateRequestFormProps = {
  onSubmit: (values: CreateRequestFormValues) => void;
  defaultValues?: CreateRequestFormValues;
  submitLabel?: string;
  variant?: "create" | "edit";
};

const EMPTY_VALUES: CreateRequestFormValues = {
  title: "",
  description: "",
  location: "3A/B",
  requestType: "",
  issueType: "",
  priority: "",
};

export default function CreateRequestForm({
  onSubmit,
  defaultValues,
  submitLabel,
  variant = "create",
}: CreateRequestFormProps) {
  const { t } = useTranslation();
  const isEdit = variant === "edit";
  const typePickerRef = useRef<RequestTypePickerBottomSheetRef>(null);
  const locationPickerRef = useRef<RequestLocationPickerBottomSheetRef>(null);
  const priorityPickerRef = useRef<RequestPriorityPickerBottomSheetRef>(null);
  const issueTypePickerRef = useRef<RequestIssueTypePickerBottomSheetRef>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRequestFormValues>({
    resolver: zodResolver(isEdit ? editRequestSchema : createRequestSchema),
    defaultValues: defaultValues ?? EMPTY_VALUES,
  });

  const requestType = watch("requestType") as RequestType | "";
  const issueType = watch("issueType");
  const location = watch("location");
  const priority = watch("priority") as RequestPriority | "";
  const issueTypeOptions = getIssueTypeOptionsForRequestType(requestType);
  const showIssueTypeField =
    isEdit &&
    (requestType === "maintenance" || requestType === "emergency");
  const resolvedSubmitLabel =
    submitLabel ??
    (isEdit ? t("requests.form.submit.edit") : t("requests.form.submit.create"));
  const priorityPrefix = isEdit ? "requests.priorityShort" : "requests.priorities";

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName={isEdit ? "pb-4" : "pb-10"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!isEdit ? (
          <Text className="mb-6 text-base font-bold text-heading">
            {t("requests.create.intro")}
          </Text>
        ) : null}

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-heading">
            {t("requests.form.fields.title")}
            <Text className="text-rejected">*</Text>
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("requests.form.titlePlaceholder")}
                placeholderTextColor={colors.secText}
                className={`rounded-xl border bg-white px-4 py-3.5 text-base text-heading ${
                  errors.title ? "border-rejected-200" : "border-card-border"
                }`}
              />
            )}
          />
          {errors.title ? (
            <Text className="mt-2 text-sm text-rejected">{errors.title.message}</Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-heading">
            {t("requests.form.fields.description")}
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("requests.form.descriptionPlaceholder")}
                placeholderTextColor={colors.secText}
                multiline
                textAlignVertical="top"
                className="min-h-[120px] rounded-xl border border-card-border bg-white px-4 py-3.5 text-base text-heading"
              />
            )}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-heading">
            {t("requests.form.fields.location")}
            <Text className="text-rejected">*</Text>
          </Text>
          <Pressable
            onPress={() => locationPickerRef.current?.open(location)}
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.location ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text className="text-base text-heading">
              {location || t("requests.form.selectLocation")}
            </Text>
            <MaterialDesignIcons name="chevron-down" color={colors.secText} size={20} />
          </Pressable>
          {errors.location ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.location.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-heading">
            {t("requests.form.fields.requestType")}
            <Text className="text-rejected">*</Text>
          </Text>
          <Pressable
            onPress={() =>
              typePickerRef.current?.open(
                requestType ? (requestType as RequestType) : undefined,
              )
            }
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.requestType ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text
              className={`text-base ${
                requestType ? "text-heading" : "text-sec-text"
              }`}
            >
              {requestType
                ? translateLabel(t, "requests.types", requestType)
                : t("requests.form.selectRequestType")}
            </Text>
            <MaterialDesignIcons name="chevron-down" color={colors.secText} size={20} />
          </Pressable>
          {errors.requestType ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.requestType.message}
            </Text>
          ) : null}
        </View>

        {showIssueTypeField ? (
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-heading">
              {t("requests.form.fields.issueType")}
              <Text className="text-rejected">*</Text>
            </Text>
            <Pressable
              onPress={() =>
                issueTypePickerRef.current?.open(
                  issueTypeOptions,
                  issueType || undefined,
                )
              }
              accessibilityRole="button"
              className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
                errors.issueType ? "border-rejected-200" : "border-card-border"
              }`}
            >
              <Text
                className={`text-base ${
                  issueType ? "text-heading" : "text-sec-text"
                }`}
              >
                {issueType
                  ? translateLabel(t, "requests.issueTypes", issueType as RequestIssueType)
                  : t("requests.form.selectIssueType")}
              </Text>
              <MaterialDesignIcons name="chevron-down" color={colors.secText} size={20} />
            </Pressable>
            {errors.issueType ? (
              <Text className="mt-2 text-sm text-rejected">
                {errors.issueType.message}
              </Text>
            ) : null}
          </View>
        ) : null}

        {!isEdit && requestType === "maintenance" ? (
          <RequestIssueTypeGrid
            title={t("requests.form.chooseMaintenanceType")}
            options={MAINTENANCE_ISSUE_TYPES}
            selectedId={issueType}
            onSelect={(nextIssueType) =>
              setValue("issueType", nextIssueType, { shouldValidate: true })
            }
          />
        ) : null}

        {!isEdit && requestType === "emergency" ? (
          <RequestIssueTypeGrid
            title={t("requests.form.chooseEmergencyType")}
            options={EMERGENCY_ISSUE_TYPES}
            selectedId={issueType}
            onSelect={(nextIssueType) =>
              setValue("issueType", nextIssueType, { shouldValidate: true })
            }
          />
        ) : null}

        <View className={isEdit ? "mb-0" : "mb-4"}>
          <Text className="mb-2 text-sm font-semibold text-heading">
            {t("requests.form.fields.requestPriority")}
            <Text className="text-rejected">*</Text>
          </Text>
          <Pressable
            onPress={() =>
              priorityPickerRef.current?.open(
                priority ? (priority as RequestPriority) : undefined,
              )
            }
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.priority ? "border-rejected-200" : "border-card-border"
            }`}
          >
            <Text
              className={`text-base ${
                priority ? "text-heading" : "text-sec-text"
              }`}
            >
              {priority
                ? translateLabel(t, priorityPrefix, priority)
                : t("requests.form.fields.requestPriority")}
            </Text>
            <MaterialDesignIcons name="chevron-down" color={colors.secText} size={20} />
          </Pressable>
          {errors.priority ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.priority.message}
            </Text>
          ) : null}
        </View>

        {!isEdit ? (
          <Pressable
            onPress={handleSubmit(onSubmit)}
            accessibilityRole="button"
            className="mt-2 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
          >
            <Text className="text-base font-bold text-white">
              {resolvedSubmitLabel}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      {isEdit ? (
        <Pressable
          onPress={handleSubmit(onSubmit)}
          accessibilityRole="button"
          className="mt-4 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-white">
            {resolvedSubmitLabel}
          </Text>
        </Pressable>
      ) : null}

      <RequestTypePickerBottomSheet
        ref={typePickerRef}
        onSelect={(nextType) => {
          setValue("requestType", nextType, { shouldValidate: true });
          setValue("issueType", "", { shouldValidate: true });
        }}
      />

      <RequestLocationPickerBottomSheet
        ref={locationPickerRef}
        onSelect={(nextLocation) =>
          setValue("location", nextLocation, { shouldValidate: true })
        }
      />

      <RequestIssueTypePickerBottomSheet
        ref={issueTypePickerRef}
        onSelect={(nextIssueType) =>
          setValue("issueType", nextIssueType, { shouldValidate: true })
        }
      />

      <RequestPriorityPickerBottomSheet
        ref={priorityPickerRef}
        onSelect={(nextPriority) =>
          setValue("priority", nextPriority, { shouldValidate: true })
        }
      />
    </View>
  );
}
