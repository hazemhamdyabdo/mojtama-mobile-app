import { colors } from "@/theme/colors";
import DocumentCategoryBadge from "@/features/documents/components/DocumentCategoryBadge";
import DocumentFileTypeIcon from "@/features/documents/components/DocumentFileTypeIcon";
import type { CommunityDocument } from "@/features/documents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type DocumentPreviewCardProps = {
  document: CommunityDocument;
  onRemove?: () => void;
  bordered?: boolean;
};

export default function DocumentPreviewCard({
  document,
  onRemove,
  bordered = false,
}: DocumentPreviewCardProps) {
  const { t } = useTranslation();

  return (
    <View
      className={`flex-row items-center gap-3 rounded-2xl bg-white p-3 ${
        bordered ? "border border-card-border" : ""
      }`}
    >
      <DocumentFileTypeIcon fileType={document.fileType} size="sm" />

      <View className="flex-1">
        <Text className="text-sm font-semibold text-heading">
          {document.title}
        </Text>
        <View className="mt-1 flex-row flex-wrap items-center gap-1.5">
          <DocumentCategoryBadge category={document.category} />
          <Text className="text-xs text-sec-text">
            {document.size} • {document.date}
          </Text>
        </View>
      </View>

      {onRemove ? (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={t("documents.a11y.removeFile")}
          className="size-8 items-center justify-center active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="close" color={colors.secText} size={20} />
        </Pressable>
      ) : null}
    </View>
  );
}
