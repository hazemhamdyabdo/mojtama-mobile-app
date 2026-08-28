import type { RequestType } from "@/features/requests/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type RequestTypeBadgeProps = {
  requestType: RequestType;
};

function getTypeStyles(requestType: RequestType) {
  switch (requestType) {
    case "maintenance":
      return { container: "bg-approved-50", text: "text-approved-700" };
    case "noise":
      return { container: "bg-pending-50", text: "text-pending" };
    case "billing":
      return { container: "bg-primary-50", text: "text-primary" };
    case "emergency":
      return { container: "bg-rejected-50", text: "text-rejected" };
    case "security":
      return { container: "bg-slate-200", text: "text-slate-600" };
    default: {
      const exhaustive: never = requestType;
      return exhaustive;
    }
  }
}

export default function RequestTypeBadge({
  requestType,
}: RequestTypeBadgeProps) {
  const { t } = useTranslation();
  const styles = getTypeStyles(requestType);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {translateLabel(t, "requests.types", requestType)}
      </Text>
    </View>
  );
}
