import type { VisitorStatus } from "@/features/visitors/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type VisitorStatusBadgeProps = {
  status: VisitorStatus;
};

function getStatusStyles(status: VisitorStatus) {
  switch (status) {
    case "approved":
      return {
        container: "bg-approved-50",
        text: "text-approved-600",
      };
    case "pending":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
      };
    case "complete":
      return {
        container: "bg-primary-50",
        text: "text-primary",
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function VisitorStatusBadge({ status }: VisitorStatusBadgeProps) {
  const { t } = useTranslation();
  const styles = getStatusStyles(status);

  return (
    <View className={`rounded-full px-2.5 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {t(`visitors.status.${status}`)}
      </Text>
    </View>
  );
}
