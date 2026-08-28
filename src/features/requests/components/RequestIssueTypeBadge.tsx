import type { RequestIssueType } from "@/features/requests/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type RequestIssueTypeBadgeProps = {
  issueType: RequestIssueType;
};

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
  const { t } = useTranslation();
  const styles = getIssueStyles(issueType);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {translateLabel(t, "requests.issueTypes", issueType)}
      </Text>
    </View>
  );
}
