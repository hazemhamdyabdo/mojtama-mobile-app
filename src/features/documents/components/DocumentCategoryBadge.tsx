import { DOCUMENT_CATEGORY_LABELS } from "@/features/documents/constants/dummy";
import type { DocumentCategory } from "@/features/documents/types";
import { Text, View } from "react-native";

type DocumentCategoryBadgeProps = {
  category: DocumentCategory;
};

export default function DocumentCategoryBadge({
  category,
}: DocumentCategoryBadgeProps) {
  return (
    <View className="rounded-full bg-primary-50 px-2.5 py-0.5">
      <Text className="text-xs font-medium text-primary">
        {DOCUMENT_CATEGORY_LABELS[category]}
      </Text>
    </View>
  );
}
