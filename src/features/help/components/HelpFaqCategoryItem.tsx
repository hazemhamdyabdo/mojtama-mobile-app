import { colors } from "@/theme/colors";
import HelpFaqQuestionCard from "@/features/help/components/HelpFaqQuestionCard";
import type { HelpFaqCategory } from "@/features/help/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type HelpFaqCategoryItemProps = {
  category: HelpFaqCategory;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function HelpFaqCategoryItem({
  category,
  isExpanded,
  onToggle,
}: HelpFaqCategoryItemProps) {
  return (
    <View className="mb-4">
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        className={`flex-row items-center rounded-2xl border px-4 py-4 active:opacity-[0.92] ${
          isExpanded
            ? "border-primary bg-primary-50"
            : "border-card-border bg-white"
        }`}
      >
        <MaterialDesignIcons
          name={category.icon}
          color={isExpanded ? colors.primary : colors.slate500}
          size={22}
        />
        <Text
          className={`ml-3 flex-1 text-base font-semibold ${
            isExpanded ? "text-primary" : "text-heading"
          }`}
        >
          {category.title}
        </Text>
        <MaterialDesignIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          color={isExpanded ? colors.primary : colors.slate500}
          size={22}
        />
      </Pressable>

      {isExpanded ? (
        <View className="mt-3 gap-3">
          {category.questions.map((item) => (
            <HelpFaqQuestionCard key={item.id} question={item} />
          ))}
        </View>
      ) : null}
    </View>
  );
}
