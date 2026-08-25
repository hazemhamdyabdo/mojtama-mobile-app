import { PAYMENT_FILTERS } from "@/features/payments/constants/dummy";
import type { PaymentBillFilter } from "@/features/payments/types";
import { Pressable, ScrollView, Text } from "react-native";

type PaymentFilterChipsProps = {
  selectedFilter: PaymentBillFilter;
  onSelectFilter: (filter: PaymentBillFilter) => void;
};

function PaymentFilterChipItem({
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

export default function PaymentFilterChips({
  selectedFilter,
  onSelectFilter,
}: PaymentFilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mb-6 gap-2"
    >
      {PAYMENT_FILTERS.map((filter) => (
        <PaymentFilterChipItem
          key={filter.id}
          label={filter.label}
          selected={selectedFilter === filter.id}
          onPress={() => onSelectFilter(filter.id)}
        />
      ))}
    </ScrollView>
  );
}
