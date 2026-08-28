import { DOCUMENT_CATEGORY_FILTERS } from "@/features/documents/constants/dummy";
import type { DocumentCategoryFilter } from "@/features/documents/types";
import { translateOptions } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text } from "react-native";

type DocumentCategoryChipsProps = {
  selectedCategory: DocumentCategoryFilter;
  onSelectCategory: (category: DocumentCategoryFilter) => void;
};

function CategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full px-5 py-2.5 active:opacity-[0.92] ${
        selected ? "bg-primary-50" : "border border-slate-200 bg-white"
      }`}
    >
      <Text
        className={`text-sm ${
          selected
            ? "font-semibold text-primary"
            : "font-normal text-sec-text"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function DocumentCategoryChips({
  selectedCategory,
  onSelectCategory,
}: DocumentCategoryChipsProps) {
  const { t } = useTranslation();
  const categories = translateOptions(
    t,
    "documents.categories",
    DOCUMENT_CATEGORY_FILTERS,
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mb-5 gap-2"
    >
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          label={category.label}
          selected={selectedCategory === category.id}
          onPress={() => onSelectCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}
