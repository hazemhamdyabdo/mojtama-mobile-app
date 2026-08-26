import { DOCUMENT_CATEGORY_LABELS } from "@/features/documents/constants/dummy";
import DocumentCategoryPickerBottomSheet, {
  type DocumentCategoryPickerBottomSheetRef,
} from "@/features/documents/components/DocumentCategoryPickerBottomSheet";
import DocumentPreviewCard from "@/features/documents/components/DocumentPreviewCard";
import {
  documentFormSchema,
  type DocumentFormValues,
} from "@/features/documents/schemas/documentSchema";
import type { CommunityDocument, DocumentCategory } from "@/features/documents/types";
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
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type EditDocumentBottomSheetRef = {
  open: (document: CommunityDocument) => void;
  close: () => void;
};

type EditDocumentBottomSheetProps = {
  onUpdate: (documentId: string, values: DocumentFormValues) => void;
};

const EditDocumentBottomSheet = forwardRef<
  EditDocumentBottomSheetRef,
  EditDocumentBottomSheetProps
>(function EditDocumentBottomSheet({ onUpdate }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const categoryPickerRef = useRef<DocumentCategoryPickerBottomSheetRef>(null);
  const insets = useSafeAreaInsets();
  const [document, setDocument] = useState<CommunityDocument | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: { title: "", category: "" },
  });

  const category = watch("category");

  useImperativeHandle(ref, () => ({
    open: (nextDocument) => {
      setDocument(nextDocument);
      reset({
        title: nextDocument.title,
        category: nextDocument.category,
      });
      bottomSheetRef.current?.present();
    },
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  useEffect(() => {
    if (document) {
      reset({
        title: document.title,
        category: document.category,
      });
    }
  }, [document, reset]);

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

  const handleUpdate = handleSubmit((values) => {
    if (!document) {
      return;
    }

    onUpdate(document.id, values);
    bottomSheetRef.current?.dismiss();
  });

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "#FFFFFF",
        }}
      >
        <BottomSheetView
          style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
        >
          <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
            Edit Documents
          </Text>

          {document ? (
            <DocumentPreviewCard
              document={document}
              bordered
              onRemove={() => bottomSheetRef.current?.dismiss()}
            />
          ) : null}

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
              Documents name<Text className="text-[#EF4444]">*</Text>
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
                  placeholderTextColor="#90A1B9"
                  className={`rounded-xl border bg-white px-4 py-3.5 text-base text-[#1F1F1F] ${
                    errors.title ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
                  }`}
                />
              )}
            />
            {errors.title ? (
              <Text className="mt-2 text-sm text-[#EF4444]">
                {errors.title.message}
              </Text>
            ) : null}
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
              Category<Text className="text-[#EF4444]">*</Text>
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
                errors.category ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
              }`}
            >
              <Text
                className={`text-base ${
                  category ? "text-[#1F1F1F]" : "text-[#90A1B9]"
                }`}
              >
                {category
                  ? DOCUMENT_CATEGORY_LABELS[category as DocumentCategory]
                  : "select category"}
              </Text>
              <MaterialDesignIcons
                name="chevron-down"
                color="#90A1B9"
                size={20}
              />
            </Pressable>
            {errors.category ? (
              <Text className="mt-2 text-sm text-[#EF4444]">
                {errors.category.message}
              </Text>
            ) : null}
          </View>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              onPress={() => bottomSheetRef.current?.dismiss()}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl border border-[#CAD5E2] bg-white py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-[#62748E]">Cancel</Text>
            </Pressable>

            <Pressable
              onPress={handleUpdate}
              accessibilityRole="button"
              className="flex-1 items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">
                Update Documents
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <DocumentCategoryPickerBottomSheet ref={categoryPickerRef} />
    </>
  );
});

export default EditDocumentBottomSheet;
