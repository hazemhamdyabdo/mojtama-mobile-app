import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <View className="mb-4">
      <Text className="mb-3 text-sm font-semibold text-heading">{title}</Text>
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
                isSelected ? "bg-pending-50" : "bg-slate-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-pending-700" : "text-slate-500"
                }`}
              >
                {translateLabel(t, "requests.issueTypes", option.id)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
