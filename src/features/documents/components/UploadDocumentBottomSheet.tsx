import { colors } from "@/theme/colors";
import { DOCUMENT_CATEGORY_LABELS } from "@/features/documents/constants/dummy";
import DocumentCategoryPickerBottomSheet, {
  type DocumentCategoryPickerBottomSheetRef,
} from "@/features/documents/components/DocumentCategoryPickerBottomSheet";
import {
  documentFormSchema,
  type DocumentFormValues,
} from "@/features/documents/schemas/documentSchema";
import type { DocumentCategory, SelectedDocumentFile } from "@/features/documents/types";
import {
  DocumentFileError,
  getDefaultDocumentTitle,
  pickDocumentFile,
} from "@/features/documents/utils/documentFile";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type UploadDocumentBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type UploadDocumentBottomSheetProps = {
  onUpload: (values: DocumentFormValues, file: SelectedDocumentFile) => void;
};

const UploadDocumentBottomSheet = forwardRef<
  UploadDocumentBottomSheetRef,
  UploadDocumentBottomSheetProps
>(function UploadDocumentBottomSheet({ onUpload }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const categoryPickerRef = useRef<DocumentCategoryPickerBottomSheetRef>(null);
  const insets = useSafeAreaInsets();
  const [selectedFile, setSelectedFile] = useState<SelectedDocumentFile | null>(
    null,
  );
  const [isPickingFile, setIsPickingFile] = useState(false);
  const [pickError, setPickError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: { title: "", category: "" },
  });

  const category = watch("category");

  useImperativeHandle(ref, () => ({
    open: () => {
      reset({ title: "", category: "" });
      setSelectedFile(null);
      setPickError(null);
      setFileError(null);
      setIsPickingFile(false);
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

  const handlePickFile = async () => {
    setPickError(null);
    setFileError(null);
    setIsPickingFile(true);

    try {
      const pickedFile = await pickDocumentFile();

      if (!pickedFile) {
        return;
      }

      setSelectedFile(pickedFile);

      if (!getValues("title").trim()) {
        setValue("title", getDefaultDocumentTitle(pickedFile.name), {
          shouldValidate: true,
        });
      }
    } catch (error) {
      const message =
        error instanceof DocumentFileError
          ? error.message
          : "Unable to pick a document. Please try again.";

      setPickError(message);
      console.warn("Document pick failed", error);
    } finally {
      setIsPickingFile(false);
    }
  };

  const handleUpload = handleSubmit((values) => {
    if (!selectedFile) {
      setFileError("Please select a document to upload.");
      return;
    }

    onUpload(values, selectedFile);
    bottomSheetRef.current?.dismiss();
  });

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
          <Text className="mb-4 text-center text-base font-bold text-heading">
            Upload Documents
          </Text>

          <Pressable
            onPress={() => void handlePickFile()}
            disabled={isPickingFile}
            accessibilityRole="button"
            accessibilityState={{ disabled: isPickingFile }}
            className="items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 active:opacity-[0.92]"
          >
            <View className="size-14 items-center justify-center rounded-full bg-primary-50">
              {isPickingFile ? (
                <ActivityIndicator color={colors.primary} />
              ) : (
                <MaterialDesignIcons
                  name="cloud-upload-outline"
                  color={colors.primary}
                  size={28}
                />
              )}
            </View>
            <Text className="mt-3 text-center text-sm text-slate-500">
              <Text className="font-semibold text-primary">
                Click to upload
              </Text>{" "}
              or drag and drop
            </Text>
            <Text className="mt-1 text-xs text-sec-text">
              Max file size: 20 MB
            </Text>
            {selectedFile ? (
              <Text className="mt-2 text-xs font-medium text-heading">
                {selectedFile.name} ({selectedFile.size})
              </Text>
            ) : null}
          </Pressable>
          {pickError ? (
            <Text className="mt-2 text-sm text-rejected">{pickError}</Text>
          ) : null}
          {fileError ? (
            <Text className="mt-2 text-sm text-rejected">{fileError}</Text>
          ) : null}

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold text-heading">
              Documents name<Text className="text-rejected">*</Text>
            </Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Document name"
                  placeholderTextColor={colors.secText}
                  className={`rounded-xl border bg-white px-4 py-3.5 text-base text-heading ${
                    errors.title ? "border-rejected-200" : "border-card-border"
                  }`}
                />
              )}
            />
            {errors.title ? (
              <Text className="mt-2 text-sm text-rejected">
                {errors.title.message}
              </Text>
            ) : null}
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold text-heading">
              Category<Text className="text-rejected">*</Text>
            </Text>
            <Pressable
              onPress={() =>
                categoryPickerRef.current?.open({
                  selected: category,
                  onSelect: (nextCategory) =>
                    setValue("category", nextCategory, {
                      shouldValidate: true,
                    }),
                })
              }
              accessibilityRole="button"
              className={`flex-row items-center justify-between rounded-xl border bg-white px-4 py-3.5 active:opacity-[0.92] ${
                errors.category ? "border-rejected-200" : "border-card-border"
              }`}
            >
              <Text
                className={`text-base ${
                  category ? "text-heading" : "text-sec-text"
                }`}
              >
                {category
                  ? DOCUMENT_CATEGORY_LABELS[category as DocumentCategory]
                  : "select category"}
              </Text>
              <MaterialDesignIcons
                name="chevron-down"
                color={colors.secText}
                size={20}
              />
            </Pressable>
            {errors.category ? (
              <Text className="mt-2 text-sm text-rejected">
                {errors.category.message}
              </Text>
            ) : null}
          </View>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={() => bottomSheetRef.current?.dismiss()}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-input-text bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-slate-500">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleUpload}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl bg-primary py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">
                Upload Documents
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <DocumentCategoryPickerBottomSheet ref={categoryPickerRef} />
    </>
  );
});

export default UploadDocumentBottomSheet;
