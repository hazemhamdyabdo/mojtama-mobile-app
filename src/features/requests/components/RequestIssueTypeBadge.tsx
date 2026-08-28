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
      return { container: "bg-pending-50", text: "text-pending-700" };
    case "fire":
      return { container: "bg-rejected-50", text: "text-rejected" };
    case "water-damage":
      return { container: "bg-primary-50", text: "text-primary-700" };
    case "medical":
      return { container: "bg-approved-50", text: "text-approved-700" };
    case "security-threat":
      return { container: "bg-slate-200", text: "text-slate-600" };
    default:
      return { container: "bg-slate-100", text: "text-slate-500" };
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
