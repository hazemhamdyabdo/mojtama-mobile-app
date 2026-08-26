import DocumentCategoryBadge from "@/features/documents/components/DocumentCategoryBadge";
import DocumentFileTypeIcon from "@/features/documents/components/DocumentFileTypeIcon";
import type { CommunityDocument } from "@/features/documents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type DocumentCardProps = {
  document: CommunityDocument;
  onDownloadPress: (documentId: string) => void;
  onMenuPress: (document: CommunityDocument) => void;
};

export default function DocumentCard({
  document,
  onDownloadPress,
  onMenuPress,
}: DocumentCardProps) {
  return (
    <View className="mb-3 flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <DocumentFileTypeIcon fileType={document.fileType} />

      <View className="flex-1">
        <Text className="text-base font-semibold text-[#1F1F1F]">
          {document.title}
        </Text>
        <View className="mt-1.5 flex-row flex-wrap items-center gap-1.5">
          <DocumentCategoryBadge category={document.category} />
          <Text className="text-xs text-[#90A1B9]">
            {document.size} • {document.date}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-1">
        <Pressable
          onPress={() => onDownloadPress(document.id)}
          accessibilityRole="button"
          accessibilityLabel="Download document"
          className="size-9 items-center justify-center active:opacity-[0.92]"
        >
          <MaterialDesignIcons
            name="download-outline"
            color="#64748B"
            size={22}
          />
        </Pressable>

        <Pressable
          onPress={() => onMenuPress(document)}
          accessibilityRole="button"
          accessibilityLabel="Document options"
          className="size-9 items-center justify-center active:opacity-[0.92]"
        >
          <MaterialDesignIcons
            name="dots-vertical"
            color="#64748B"
            size={22}
          />
        </Pressable>
      </View>
    </View>
  );
}
