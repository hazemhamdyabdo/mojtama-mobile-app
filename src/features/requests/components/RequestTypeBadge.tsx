import { REQUEST_TYPE_LABELS } from "@/features/requests/constants/dummy";
import type { RequestType } from "@/features/requests/types";
import { Text, View } from "react-native";

type RequestTypeBadgeProps = {
  requestType: RequestType;
};

function getTypeStyles(requestType: RequestType) {
  switch (requestType) {
    case "maintenance":
      return { container: "bg-[#F0FDFA]", text: "text-[#00786F]" };
    case "noise":
      return { container: "bg-[#FFF6DE]", text: "text-[#FBBF24]" };
    case "billing":
      return { container: "bg-[#F0EDFF]", text: "text-[#7B61FF]" };
    case "emergency":
      return { container: "bg-[#FEE2E2]", text: "text-[#EF4444]" };
    case "security":
      return { container: "bg-[#E2E8F0]", text: "text-[#475569]" };
    default: {
      const exhaustive: never = requestType;
      return exhaustive;
    }
  }
}

export default function RequestTypeBadge({
  requestType,
}: RequestTypeBadgeProps) {
  const styles = getTypeStyles(requestType);

  return (
    <View className={`rounded-full px-3 py-1 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {REQUEST_TYPE_LABELS[requestType]}
      </Text>
    </View>
  );
}
