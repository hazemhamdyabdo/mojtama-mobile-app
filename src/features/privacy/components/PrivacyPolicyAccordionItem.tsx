import { colors } from "@/theme/colors";
import type { PrivacyPolicy } from "@/features/privacy/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

const POLICY_I18N_KEYS: Record<string, string> = {
  "community-privacy": "community",
  "visitor-policy": "visitor",
  "smoking-policy": "smoking",
  "noise-policy": "noise",
};

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
  const { t } = useTranslation();
  const policyKey = POLICY_I18N_KEYS[policy.id] ?? policy.id;

  return (
    <View className="mb-4">
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        className={`flex-row items-center rounded-2xl border px-4 py-4 active:opacity-[0.92] ${
          isExpanded
            ? " border-primary bg-primary-50"
            : "border-card-border bg-white"
        }`}
      >
        <MaterialDesignIcons
          name="file-document-outline"
          color={isExpanded ? colors.primary : colors.slate500}
          size={22}
        />
        <Text
          className={`ml-3 flex-1 text-base font-semibold ${
            isExpanded ? "text-primary" : "text-heading"
          }`}
        >
          {t(`privacy.policies.${policyKey}`)}
        </Text>
        <MaterialDesignIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          color={isExpanded ? colors.primary : colors.slate500}
          size={22}
        />
      </Pressable>

      {isExpanded ? (
        <View className="mt-2 rounded-2xl border border-card-border  bg-white px-4 py-4">
          <Text className="text-sm leading-5 text-slate-500">
            {policy.intro}
          </Text>
          <View className="mt-3 gap-2">
            {policy.bullets.map((bullet) => (
              <View key={bullet} className="flex-row gap-2">
                <Text className="text-sm text-slate-500">•</Text>
                <Text className="flex-1 text-sm leading-5 text-slate-500">
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
