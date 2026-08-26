import type { RequestIssueType } from "@/features/requests/types";
import { Text, View } from "react-native";

type RequestIssueTypeBadgeProps = {
  issueType: RequestIssueType;
};

function getIssueLabel(issueType: RequestIssueType): string {
  switch (issueType) {
    case "electricity":
      return "Electricity";
    case "plumbing":
      return "Plumbing";
    case "hvac":
      return "HVAC";
    case "delivery":
      return "Delivery";
    case "fire":
      return "Fire";
    case "water-damage":
      return "Water damage";
    case "medical":
      return "Medical";
    case "security-threat":
      return "Security Threat";
    case "electrical":
      return "Electrical";
    case "other":
      return "Other";
    default: {
      const exhaustive: never = issueType;
      return exhaustive;
    }
  }
}

function getIssueStyles(issueType: RequestIssueType) {
  switch (issueType) {
    case "electricity":
    case "electrical":
      return { container: "bg-[#FEF9C3]", text: "text-[#CA8A04]" };
    case "fire":
      return { container: "bg-[#FEE2E2]", text: "text-[#EF4444]" };
    case "water-damage":
      return { container: "bg-[#DBEAFE]", text: "text-[#2563EB]" };
    case "medical":
      return { container: "bg-[#DCFCE7]", text: "text-[#16A34A]" };
    case "security-threat":
      return { container: "bg-[#E2E8F0]", text: "text-[#475569]" };
    default:
      return { container: "bg-[#F1F5F9]", text: "text-[#64748B]" };
  }
}

export default function RequestIssueTypeBadge({
  issueType,
}: RequestIssueTypeBadgeProps) {
  const styles = getIssueStyles(issueType);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {getIssueLabel(issueType)}
      </Text>
    </View>
  );
}
