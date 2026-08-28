import { translateOptions } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text } from "react-native";

export type FilterOption = {
  id: string;
  label: string;
};

type FilterChipItemProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const DEFAULT_FILTERS = [
  { id: "all" },
  { id: "announcements" },
  { id: "news" },
  { id: "poll" },
  { id: "meetings" },
] as const;

function FilterChipItem({ label, selected, onPress }: FilterChipItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full px-5 py-2.5 active:opacity-[0.92] ${
        selected ? "bg-primary-50" : "border border-slate-200 bg-slate-50"
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

type FilterChipProps = {
  filters?: readonly { id: string }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export default function FilterChip({
  filters = DEFAULT_FILTERS,
  selectedId = "all",
  onSelect,
}: FilterChipProps) {
  const { t } = useTranslation();
  const translatedFilters = translateOptions(t, "home.filters", filters);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
      style={{
        marginHorizontal: -10,
        paddingHorizontal: 10,
        marginTop: 10,
      }}
    >
      {translatedFilters.map((filter) => (
        <FilterChipItem
          key={filter.id}
          label={filter.label}
          selected={filter.id === selectedId}
          onPress={() => onSelect?.(filter.id)}
        />
      ))}
    </ScrollView>
  );
}
