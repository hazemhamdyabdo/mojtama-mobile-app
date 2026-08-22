import type { AnnouncementType } from "@/features/home/constants/announcementTypes";
import { ANNOUNCEMENT_TYPE_OPTIONS } from "@/features/home/constants/announcementTypes";
import {
  createAnnouncementSchema,
  type CreateAnnouncementFormValues,
} from "@/features/home/schemas/createAnnouncementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
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

type FormLabelProps = {
  label: string;
  required?: boolean;
};

function FormLabel({ label, required = false }: FormLabelProps) {
  return (
    <Text className="mb-2 text-sm font-medium text-[#2E2E2E]">
      {label}
      {required ? <Text className="text-[#EF4444]">*</Text> : null}
    </Text>
  );
}

type AnnouncementTypeChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function AnnouncementTypeChip({
  label,
  selected,
  onPress,
}: AnnouncementTypeChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full px-4 py-2.5 active:opacity-[0.92] ${
        selected ? "bg-[#F0EDFF]" : "border border-[#E2E8F0] bg-[#F8FAFC]"
      }`}
    >
      <Text
        className={`text-sm ${
          selected
            ? "font-semibold text-[#7B61FF]"
            : "font-medium text-[#64748B]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type CreateAnnouncementFormProps = {
  onSubmit: (values: CreateAnnouncementFormValues) => void | Promise<void>;
};

export default function CreateAnnouncementForm({
  onSubmit,
}: CreateAnnouncementFormProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateAnnouncementFormValues>({
    resolver: zodResolver(createAnnouncementSchema()),
    defaultValues: {
      announcementType: "general",
      title: "",
      content: "",
      image: null,
      isEmergency: true,
    },
  });

  const selectedImage = watch("image");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];

    setValue(
      "image",
      {
        uri: asset.uri,
        name: asset.fileName ?? undefined,
        mimeType: asset.mimeType ?? undefined,
        size: asset.fileSize ?? undefined,
      },
      { shouldValidate: true },
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
        <Text className="mb-6 text-2xl font-bold text-[#1F1F1F]">
          Create Announcement
        </Text>

        <View className="mb-5">
          <FormLabel label="Announcement type" required />

          <Controller
            control={control}
            name="announcementType"
            render={({ field: { value, onChange } }) => (
              <View className="flex-row flex-wrap gap-2">
                {ANNOUNCEMENT_TYPE_OPTIONS.map((option) => (
                  <AnnouncementTypeChip
                    key={option.id}
                    label={option.label}
                    selected={value === option.id}
                    onPress={() => onChange(option.id as AnnouncementType)}
                  />
                ))}
              </View>
            )}
          />

          {errors.announcementType ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.announcementType.message}
            </Text>
          ) : null}
        </View>

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
                placeholderTextColor="#90A1B9"
                className={`rounded-xl border bg-white px-4 text-base text-[#1F1F1F] ${
                  errors.title ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
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
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.title.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-5">
          <FormLabel label="Content" required />

          <Controller
            control={control}
            name="content"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Type announcement content"
                placeholderTextColor="#90A1B9"
                multiline
                textAlignVertical="top"
                className={`rounded-xl border bg-white px-4 py-3 text-base text-[#1F1F1F] ${
                  errors.content ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
                }`}
                style={{
                  textAlign,
                  minHeight: 140,
                }}
              />
            )}
          />

          {errors.content ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.content.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-5">
          <FormLabel label="Image" required />

          <Pressable
            onPress={pickImage}
            accessibilityRole="button"
            accessibilityLabel="Upload image"
            className={`items-center justify-center rounded-xl border border-dashed bg-[#F8FAFC] px-4 py-8 active:opacity-[0.92] ${
              errors.image ? "border-[#FCA5A5]" : "border-[#CBD5E1]"
            }`}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                contentFit="cover"
                style={{
                  height: 128,
                  width: "100%",
                  borderRadius: 8,
                }}
              />
            ) : (
              <MaterialDesignIcons
                name="cloud-upload-outline"
                color="#7B61FF"
                size={28}
              />
            )}

            <Text className="mt-2 text-center text-sm text-[#64748B]">
              <Text className="font-medium text-[#7B61FF]">
                Click to upload
              </Text>
              {" or drag and drop"}
            </Text>
            <Text className="mt-1 text-center text-xs text-[#90A1B9]">
              JPG, JPEG, PNG less than 1MB
            </Text>
          </Pressable>

          {errors.image ? (
            <Text className="mt-2 text-sm text-[#EF4444]">
              {errors.image.message}
            </Text>
          ) : null}
        </View>

        <Controller
          control={control}
          name="isEmergency"
          render={({ field: { value, onChange } }) => (
            <View className="flex-col items-start rounded-xl border border-[#E4E4E7] bg-[#F8FAFC] px-4 py-3">
              <View className="flex-row items-center">
                <View className=" size-10 items-center justify-center rounded-full ">
                  <MaterialDesignIcons
                    name="alert-outline"
                    color="#7B61FF"
                    size={22}
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-base font-bold text-[#1F1F1F]">
                    Emergency Feed
                  </Text>
                </View>

                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#E4E4E7", true: "#C4B5FD" }}
                  thumbColor={value ? "#7B61FF" : "#FFFFFF"}
                />
              </View>
              <Text className=" text-sm text-[#90A1B9]">
                Mark as Urgent for immediate attention
              </Text>
            </View>
          )}
        />
      </ScrollView>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        accessibilityRole="button"
        className="mt-4 items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">Create Post</Text>
      </Pressable>
    </View>
  );
}
