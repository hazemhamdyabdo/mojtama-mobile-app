import type { DocumentCategory } from "@/features/documents/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type DocumentCategoryBadgeProps = {
  category: DocumentCategory;
};

export default function DocumentCategoryBadge({
  category,
}: DocumentCategoryBadgeProps) {
  const { t } = useTranslation();

  return (
    <View className="rounded-full bg-primary-50 px-2.5 py-0.5">
      <Text className="text-xs font-medium text-primary">
        {translateLabel(t, "documents.categories", category)}
      </Text>
    </View>
  );
}
