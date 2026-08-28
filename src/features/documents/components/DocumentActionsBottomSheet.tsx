import { colors } from "@/theme/colors";
import DocumentPreviewCard from "@/features/documents/components/DocumentPreviewCard";
import type { CommunityDocument } from "@/features/documents/types";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
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

type ActionRowProps = {
  label: string;
  icon:
    | "eye-outline"
    | "download-outline"
    | "pencil-outline"
    | "trash-can-outline";
  destructive?: boolean;
  onPress: () => void;
};

function ActionRow({
  label,
  icon,
  destructive = false,
  onPress,
}: ActionRowProps) {
  const color = destructive ? colors.rejected : colors.slate500;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 py-4 active:opacity-[0.92]"
    >
      <MaterialDesignIcons name={icon} color={color} size={22} />
      <Text
        className={`text-base font-medium ${
          destructive ? "text-rejected-500" : "text-heading"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const DocumentActionsBottomSheet = forwardRef<
  DocumentActionsBottomSheetRef,
  DocumentActionsBottomSheetProps
>(function DocumentActionsBottomSheet(
  { onView, onDownload, onEdit, onDelete },
  ref,
) {
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
          <ActionRow
            label="View"
            icon="eye-outline"
            onPress={() =>
              document ? handleAction(() => onView(document.id)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <ActionRow
            label="Download"
            icon="download-outline"
            onPress={() =>
              document ? handleAction(() => onDownload(document.id)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <ActionRow
            label="Edit Document"
            icon="pencil-outline"
            onPress={() =>
              document ? handleAction(() => onEdit(document)) : undefined
            }
          />
          <View className="h-px bg-slate-200" />
          <ActionRow
            label="Delete"
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
          <Text className="text-base font-bold text-heading">Cancel</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DocumentActionsBottomSheet;
