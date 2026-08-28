import type { RequestStatus } from "@/features/requests/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type RequestStatusBadgeProps = {
  status: RequestStatus;
};

function getStatusStyles(status: RequestStatus) {
  switch (status) {
    case "pending":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
      };
    case "assigned":
      return {
        container: "bg-primary-50",
        text: "text-primary",
      };
    case "in-progress":
      return {
        container: "bg-pending-50",
        text: "text-pending-700",
      };
    case "submitted":
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

function getStatusTranslationKey(status: RequestStatus): string {
  return status === "in-progress" ? "inProgress" : status;
}

export default function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  const { t } = useTranslation();
  const styles = getStatusStyles(status);
  const label = t(`requests.status.${getStatusTranslationKey(status)}`);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{label}</Text>
    </View>
  );
}
