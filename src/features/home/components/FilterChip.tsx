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

const DEFAULT_FILTERS: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "announcements", label: "Announcements" },
  { id: "news", label: "News" },
  { id: "poll", label: "Poll" },
  { id: "meetings", label: "Meetings" },
];

function FilterChipItem({ label, selected, onPress }: FilterChipItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full px-5 py-2.5 active:opacity-[0.92] ${
        selected ? "bg-[#F0EDFF]" : "border border-[#E2E8F0] bg-[#F8FAFC]"
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

type FilterChipProps = {
  filters?: FilterOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export default function FilterChip({
  filters = DEFAULT_FILTERS,
  selectedId = "all",
  onSelect,
}: FilterChipProps) {
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
      {filters.map((filter) => (
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
