import type { PrivacyPolicy } from "@/features/privacy/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type PrivacyPolicyAccordionItemProps = {
  policy: PrivacyPolicy;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function PrivacyPolicyAccordionItem({
  policy,
  isExpanded,
  onToggle,
}: PrivacyPolicyAccordionItemProps) {
  return (
    <View className="mb-4">
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        className={`flex-row items-center rounded-2xl border px-4 py-4 active:opacity-[0.92] ${
          isExpanded
            ? " border-[#7B61FF] bg-[#F8F6FF]"
            : "border-[#E4E4E7] bg-white"
        }`}
      >
        <MaterialDesignIcons
          name="file-document-outline"
          color={isExpanded ? "#7B61FF" : "#64748B"}
          size={22}
        />
        <Text
          className={`ml-3 flex-1 text-base font-semibold ${
            isExpanded ? "text-[#7B61FF]" : "text-[#1F1F1F]"
          }`}
        >
          {policy.title}
        </Text>
        <MaterialDesignIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          color={isExpanded ? "#7B61FF" : "#64748B"}
          size={22}
        />
      </Pressable>

      {isExpanded ? (
        <View className="mt-2 rounded-2xl border border-[#E4E4E7]  bg-white px-4 py-4">
          <Text className="text-sm leading-5 text-[#64748B]">
            {policy.intro}
          </Text>
          <View className="mt-3 gap-2">
            {policy.bullets.map((bullet) => (
              <View key={bullet} className="flex-row gap-2">
                <Text className="text-sm text-[#64748B]">•</Text>
                <Text className="flex-1 text-sm leading-5 text-[#64748B]">
                  {bullet}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}
