import type { HelpFaqQuestion } from "@/features/help/types";
import { Text, View } from "react-native";

type HelpFaqQuestionCardProps = {
  question: HelpFaqQuestion;
};

export default function HelpFaqQuestionCard({
  question,
}: HelpFaqQuestionCardProps) {
  return (
    <View className="rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <Text className="text-base font-bold text-[#1F1F1F]">
        {question.question}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-[#64748B]">
        {question.answer}
      </Text>
    </View>
  );
}
