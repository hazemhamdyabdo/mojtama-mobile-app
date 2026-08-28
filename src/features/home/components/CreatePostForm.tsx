import CategoryTypeChip from "@/components/ui/CategoryTypeChip";
import FormLabel from "@/components/ui/FormLabel";
import { colors } from "@/theme/colors";
import type { AnnouncementType } from "@/features/home/constants/announcementTypes";
import { ANNOUNCEMENT_TYPE_OPTIONS } from "@/features/home/constants/announcementTypes";
import {
  createPostSchema,
  type CreatePostFormValues,
} from "@/features/home/schemas/createPostSchema";
import { translateLabel } from "@/localization/translateLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export type CreatePostFormVariant = "announcement" | "news";

type CreatePostFormProps = {
  variant: CreatePostFormVariant;
  onSubmit: (values: CreatePostFormValues) => void | Promise<void>;
};

export default function CreatePostForm({
  variant,
  onSubmit,
}: CreatePostFormProps) {
  const { t } = useTranslation();
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const typeLabel = t(`home.create.${variant}.typeLabel`);
  const schema = useMemo(() => createPostSchema(typeLabel), [typeLabel]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryType: "general",
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
        <Text className="mb-6 text-2xl font-bold text-heading">
          {t(`home.create.${variant}.title`)}
        </Text>

        <View className="mb-5">
          <FormLabel label={typeLabel} required />

          <Controller
            control={control}
            name="categoryType"
            render={({ field: { value, onChange } }) => (
              <View className="flex-row flex-wrap gap-2">
                {ANNOUNCEMENT_TYPE_OPTIONS.map((option) => (
                  <CategoryTypeChip
                    key={option.id}
                    label={translateLabel(t, "home.announcementTypes", option.id)}
                    selected={value === option.id}
                    onPress={() => onChange(option.id as AnnouncementType)}
                  />
                ))}
              </View>
            )}
          />

          {errors.categoryType ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.categoryType.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-5">
          <FormLabel label={t("home.create.fields.title")} required />

          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t(`home.create.${variant}.titlePlaceholder`)}
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
          <FormLabel label={t("home.create.fields.content")} required />

          <Controller
            control={control}
            name="content"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t(`home.create.${variant}.contentPlaceholder`)}
                placeholderTextColor={colors.secText}
                multiline
                textAlignVertical="top"
                className={`rounded-xl border bg-white px-4 py-3 text-base text-heading ${
                  errors.content ? "border-rejected-200" : "border-card-border"
                }`}
                style={{
                  textAlign,
                  minHeight: 140,
                }}
              />
            )}
          />

          {errors.content ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.content.message}
            </Text>
          ) : null}
        </View>

        <View className="mb-5">
          <FormLabel label={t("home.create.fields.image")} required />

          <Pressable
            onPress={pickImage}
            accessibilityRole="button"
            accessibilityLabel={t("home.create.uploadImage")}
            className={`items-center justify-center rounded-xl border border-dashed bg-slate-50 px-4 py-8 active:opacity-[0.92] ${
              errors.image ? "border-rejected-200" : "border-slate-300"
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
                color={colors.primary}
                size={28}
              />
            )}

            <Text className="mt-2 text-center text-sm text-slate-500">
              <Text className="font-medium text-primary">
                Click to upload
              </Text>
              {" or drag and drop"}
            </Text>
            <Text className="mt-1 text-center text-xs text-sec-text">
              JPG, JPEG, PNG less than 1MB
            </Text>
          </Pressable>

          {errors.image ? (
            <Text className="mt-2 text-sm text-rejected">
              {errors.image.message}
            </Text>
          ) : null}
        </View>

        <Controller
          control={control}
          name="isEmergency"
          render={({ field: { value, onChange } }) => (
            <View className="flex-col items-start rounded-xl border border-card-border bg-slate-50 px-4 py-3">
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
      </ScrollView>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        accessibilityRole="button"
        className="mt-4 items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("home.create.submit.post")}
        </Text>
      </Pressable>
    </View>
  );
}
