import { Pressable, Text, View } from "react-native";

type IssueTypeOption = {
  id: string;
  label: string;
};

type RequestIssueTypeGridProps = {
  title: string;
  options: IssueTypeOption[];
  selectedId?: string;
  onSelect: (issueTypeId: string) => void;
};

export default function RequestIssueTypeGrid({
  title,
  options,
  selectedId,
  onSelect,
}: RequestIssueTypeGridProps) {
  return (
    <View className="mb-4">
      <Text className="mb-3 text-sm font-semibold text-[#1F1F1F]">{title}</Text>
      <View className="flex-row flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <Pressable
              key={option.id}
              onPress={() => onSelect(option.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              className={`min-w-[46%] flex-1 items-center rounded-xl px-4 py-3 active:opacity-[0.92] ${
                isSelected ? "bg-[#FEF9C3]" : "bg-[#F1F5F9]"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-[#CA8A04]" : "text-[#64748B]"
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
