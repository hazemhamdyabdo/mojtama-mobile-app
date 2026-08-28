import { REQUEST_FILTERS } from "@/features/requests/constants/dummy";
import type { RequestFilter } from "@/features/requests/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text } from "react-native";

type RequestFilterChipsProps = {
  selectedFilter: RequestFilter;
  onSelectFilter: (filter: RequestFilter) => void;
};

function FilterChip({
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
      className={` rounded-full px-5 py-2.5 active:opacity-[0.92] ${
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

export default function RequestFilterChips({
  selectedFilter,
  onSelectFilter,
}: RequestFilterChipsProps) {
  const { t } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mb-6 gap-2"
    >
      {REQUEST_FILTERS.map((filter) => (
        <FilterChip
          key={filter.id}
          label={translateLabel(t, "requests.filters", filter.id)}
          selected={selectedFilter === filter.id}
          onPress={() => onSelectFilter(filter.id)}
        />
      ))}
    </ScrollView>
  );
}
