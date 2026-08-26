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
  REQUEST_ISSUE_TYPE_LABELS,
  REQUEST_PRIORITY_LABELS,
  REQUEST_PRIORITY_SHORT_LABELS,
  REQUEST_TYPE_LABELS,
} from "@/features/requests/constants/dummy";
import {
  createRequestSchema,
  editRequestSchema,
  type CreateRequestFormValues,
} from "@/features/requests/schemas/createRequestSchema";
import type { RequestIssueType, RequestPriority, RequestType } from "@/features/requests/types";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
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
    submitLabel ?? (isEdit ? "Save Changes" : "Create Request");
  const priorityLabels = isEdit
    ? REQUEST_PRIORITY_SHORT_LABELS
    : REQUEST_PRIORITY_LABELS;

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName={isEdit ? "pb-4" : "pb-10"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!isEdit ? (
          <Text className="mb-6 text-base font-bold text-[#1F1F1F]">
            What Type Of Request Do You Need To Make?
          </Text>
        ) : null}

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
            Title<Text className="text-[#EF4444]">*</Text>
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Request title"
                placeholderTextColor="#90A1B9"
                className={`rounded-xl border bg-white px-4 py-3.5 text-base text-[#1F1F1F] ${
                  errors.title ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
                }`}
              />
            )}
          />
          {errors.title ? (
            <Text className="mt-2 text-sm text-[#EF4444]">{errors.title.message}</Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
            Description
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter Request description"
                placeholderTextColor="#90A1B9"
                multiline
                textAlignVertical="top"
                className="min-h-[120px] rounded-xl border border-[#E4E4E7] bg-white px-4 py-3.5 text-base text-[#1F1F1F]"
              />
            )}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
            Location<Text className="text-[#EF4444]">*</Text>
          </Text>
          <Pressable
            onPress={() => locationPickerRef.current?.open(location)}
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.location ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
            }`}
          >
            <Text className="text-base text-[#1F1F1F]">
              {location || "Select location"}
            </Text>
            <MaterialDesignIcons name="chevron-down" color="#90A1B9" size={20} />
          </Pressable>
          {errors.location ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.location.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
            Request Type<Text className="text-[#EF4444]">*</Text>
          </Text>
          <Pressable
            onPress={() =>
              typePickerRef.current?.open(
                requestType ? (requestType as RequestType) : undefined,
              )
            }
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.requestType ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
            }`}
          >
            <Text
              className={`text-base ${
                requestType ? "text-[#1F1F1F]" : "text-[#90A1B9]"
              }`}
            >
              {requestType
                ? REQUEST_TYPE_LABELS[requestType as RequestType]
                : "Select Request type"}
            </Text>
            <MaterialDesignIcons name="chevron-down" color="#90A1B9" size={20} />
          </Pressable>
          {errors.requestType ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.requestType.message}
            </Text>
          ) : null}
        </View>

        {showIssueTypeField ? (
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
              Issue Type<Text className="text-[#EF4444]">*</Text>
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
                errors.issueType ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
              }`}
            >
              <Text
                className={`text-base ${
                  issueType ? "text-[#1F1F1F]" : "text-[#90A1B9]"
                }`}
              >
                {issueType
                  ? REQUEST_ISSUE_TYPE_LABELS[issueType as RequestIssueType]
                  : "Select Issue type"}
              </Text>
              <MaterialDesignIcons name="chevron-down" color="#90A1B9" size={20} />
            </Pressable>
            {errors.issueType ? (
              <Text className="mt-2 text-sm text-[#EF4444]">
                {errors.issueType.message}
              </Text>
            ) : null}
          </View>
        ) : null}

        {!isEdit && requestType === "maintenance" ? (
          <RequestIssueTypeGrid
            title="Please choose Maintenance type"
            options={MAINTENANCE_ISSUE_TYPES}
            selectedId={issueType}
            onSelect={(nextIssueType) =>
              setValue("issueType", nextIssueType, { shouldValidate: true })
            }
          />
        ) : null}

        {!isEdit && requestType === "emergency" ? (
          <RequestIssueTypeGrid
            title="Please choose Emergency type"
            options={EMERGENCY_ISSUE_TYPES}
            selectedId={issueType}
            onSelect={(nextIssueType) =>
              setValue("issueType", nextIssueType, { shouldValidate: true })
            }
          />
        ) : null}

        <View className={isEdit ? "mb-0" : "mb-4"}>
          <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
            Request Priority<Text className="text-[#EF4444]">*</Text>
          </Text>
          <Pressable
            onPress={() =>
              priorityPickerRef.current?.open(
                priority ? (priority as RequestPriority) : undefined,
              )
            }
            accessibilityRole="button"
            className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
              errors.priority ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
            }`}
          >
            <Text
              className={`text-base ${
                priority ? "text-[#1F1F1F]" : "text-[#90A1B9]"
              }`}
            >
              {priority
                ? priorityLabels[priority as RequestPriority]
                : "Select Request Priority"}
            </Text>
            <MaterialDesignIcons name="chevron-down" color="#90A1B9" size={20} />
          </Pressable>
          {errors.priority ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.priority.message}
            </Text>
          ) : null}
        </View>

        {!isEdit ? (
          <Pressable
            onPress={handleSubmit(onSubmit)}
            accessibilityRole="button"
            className="mt-2 items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
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
          className="mt-4 items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
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
