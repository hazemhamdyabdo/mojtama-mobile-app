import type { HelpFaqQuestion } from "@/features/help/types";
import { Text, View } from "react-native";

type HelpFaqQuestionCardProps = {
  question: HelpFaqQuestion;
};

export default function HelpFaqQuestionCard({
  question,
}: HelpFaqQuestionCardProps) {
  return (
    <View className="rounded-2xl border border-card-border bg-white p-4">
      <Text className="text-base font-bold text-heading">
        {question.question}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-slate-500">
        {question.answer}
      </Text>
    </View>
  );
}
