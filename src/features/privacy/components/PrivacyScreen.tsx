import PrivacyHeader from "@/features/privacy/components/PrivacyHeader";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import PrivacyIntro from "@/features/privacy/components/PrivacyIntro";
import PrivacyPolicyAccordionItem from "@/features/privacy/components/PrivacyPolicyAccordionItem";
import { PRIVACY_POLICIES } from "@/features/privacy/constants/policies";
import { useState } from "react";
import { ScrollView } from "react-native";
export default function PrivacyScreen() {
  const [expandedPolicyId, setExpandedPolicyId] = useState<string>(
    PRIVACY_POLICIES[0]?.id ?? "",
  );

  const handleToggle = (policyId: string) => {
    setExpandedPolicyId((current) => (current === policyId ? "" : policyId));
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <PrivacyHeader />
        <PrivacyIntro />

        {PRIVACY_POLICIES.map((policy) => (
          <PrivacyPolicyAccordionItem
            key={policy.id}
            policy={policy}
            isExpanded={expandedPolicyId === policy.id}
            onToggle={() => handleToggle(policy.id)}
          />
        ))}
      </ScrollView>
    </ScreenSafeAreaView>
  );
}
