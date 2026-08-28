import { colors } from "@/theme/colors";
import { AI_SUGGESTIONS } from "@/features/chat/constants/suggestions";
import type { SuggestionAction } from "@/features/chat/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type ChatSuggestionsSectionProps = {
  onSelect: (suggestion: SuggestionAction) => void;
};

export default function ChatSuggestionsSection({
  onSelect,
}: ChatSuggestionsSectionProps) {
  return (
    <View className="mt-2">
      <View className="mb-4 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-slate-200" />
        <View className="flex-row items-center gap-1.5">
          <MaterialDesignIcons name="creation" color={colors.primary} size={16} />
          <Text className="text-xs text-sec-text">
            Here are some things i can help you with
          </Text>
        </View>
        <View className="h-px flex-1 bg-slate-200" />
      </View>

      <View className="gap-3">
        {AI_SUGGESTIONS.map((suggestion) => (
          <Pressable
            key={suggestion.id}
            onPress={() => onSelect(suggestion)}
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-2xl border border-card-border bg-white px-4 py-3.5 active:opacity-[0.92]"
          >
            <View className="size-10 items-center justify-center rounded-full bg-primary-50">
              <MaterialDesignIcons
                name={suggestion.icon}
                color={colors.primary}
                size={20}
              />
            </View>
            <Text className="flex-1 text-sm font-medium text-heading">
              {suggestion.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
