import BottomSheetIconActionRow from "@/components/ui/BottomSheetIconActionRow";
import { colors } from "@/theme/colors";
import DocumentPreviewCard from "@/features/documents/components/DocumentPreviewCard";
import type { CommunityDocument } from "@/features/documents/types";
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
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type DocumentActionsBottomSheetRef = {
  open: (document: CommunityDocument) => void;
  close: () => void;
};

type DocumentActionsBottomSheetProps = {
  onView: (documentId: string) => void;
  onDownload: (documentId: string) => void;
  onEdit: (document: CommunityDocument) => void;
  onDelete: (documentId: string) => void;
};

const DocumentActionsBottomSheet = forwardRef<
  DocumentActionsBottomSheetRef,
  DocumentActionsBottomSheetProps
>(function DocumentActionsBottomSheet(
  { onView, onDownload, onEdit, onDelete },
  ref,
) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [document, setDocument] = useState<CommunityDocument | null>(null);

  useImperativeHandle(ref, () => ({
    open: (nextDocument) => {
      setDocument(nextDocument);
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

  const handleAction = (action: () => void) => {
    bottomSheetRef.current?.dismiss();
    action();
  };

  return (
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
        {document ? <DocumentPreviewCard document={document} bordered /> : null}

        <View className="mt-2">
          <BottomSheetIconActionRow
            label={t("documents.actions.view")}
            icon="eye-outline"
            onPress={() =>
              document ? handleAction(() => onView(document.id)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <BottomSheetIconActionRow
            label={t("documents.actions.download")}
            icon="download-outline"
            onPress={() =>
              document ? handleAction(() => onDownload(document.id)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <BottomSheetIconActionRow
            label={t("documents.actions.edit")}
            icon="pencil-outline"
            onPress={() =>
              document ? handleAction(() => onEdit(document)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <BottomSheetIconActionRow
            label={t("documents.actions.delete")}
            icon="trash-can-outline"
            destructive
            onPress={() =>
              document ? handleAction(() => onDelete(document.id)) : undefined
            }
          />
        </View>

        <Pressable
          onPress={() => bottomSheetRef.current?.dismiss()}
          accessibilityRole="button"
          className="mt-2 items-center rounded-2xl border border-card-border py-4 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-heading">{t("common.cancel")}</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DocumentActionsBottomSheet;
