import { DOCUMENT_CATEGORY_FILTERS } from "@/features/documents/constants/dummy";
import type { DocumentCategoryFilter } from "@/features/documents/types";
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
        selected ? "bg-[#F0EDFF]" : "border border-[#E2E8F0] bg-white"
      }`}
    >
      <Text
        className={`text-sm ${
          selected
            ? "font-semibold text-[#7B61FF]"
            : "font-normal text-[#90A1B9]"
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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mb-5 gap-2"
    >
      {DOCUMENT_CATEGORY_FILTERS.map((category) => (
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
