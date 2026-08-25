import type { SupportRequestCategory } from "@/features/profile/types";
import { Text, View } from "react-native";

type SupportRequestCategoryBadgeProps = {
  category: SupportRequestCategory;
};

function getCategoryStyles(category: SupportRequestCategory) {
  switch (category) {
    case "maintenance":
      return {
        container: "bg-[#0F766E]",
        text: "text-white",
        label: "Maintenance",
      };
    case "noise":
      return {
        container: "bg-[#FEF9C3]",
        text: "text-[#CA8A04]",
        label: "Noise",
      };
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export default function SupportRequestCategoryBadge({
  category,
}: SupportRequestCategoryBadgeProps) {
  const styles = getCategoryStyles(category);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{styles.label}</Text>
    </View>
  );
}
