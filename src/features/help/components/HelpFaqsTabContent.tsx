import HelpFaqCategoryItem from "@/features/help/components/HelpFaqCategoryItem";
import HelpFaqsIntro from "@/features/help/components/HelpFaqsIntro";
import HelpStillNeedHelpCard from "@/features/help/components/HelpStillNeedHelpCard";
import { HELP_FAQ_CATEGORIES } from "@/features/help/constants/dummy";

type HelpFaqsTabContentProps = {
  expandedCategoryId: string;
  onToggleCategory: (categoryId: string) => void;
  onSupportPress?: () => void;
};

export default function HelpFaqsTabContent({
  expandedCategoryId,
  onToggleCategory,
  onSupportPress,
}: HelpFaqsTabContentProps) {
  return (
    <>
      <HelpFaqsIntro />

      {HELP_FAQ_CATEGORIES.map((category) => (
        <HelpFaqCategoryItem
          key={category.id}
          category={category}
          isExpanded={expandedCategoryId === category.id}
          onToggle={() => onToggleCategory(category.id)}
        />
      ))}

      <HelpStillNeedHelpCard onSupportPress={onSupportPress} />
    </>
  );
}
