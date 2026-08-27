import type { ResidentRole } from "@/features/residents/types";
import { Text, View } from "react-native";

type ResidentStatusBadgeProps = {
  role: ResidentRole;
};

function getRoleStyles(role: ResidentRole) {
  switch (role) {
    case "owner":
      return {
        container: "bg-[#F0EDFF]",
        text: "text-[#7B61FF]",
        label: "Owner",
      };
    case "tenant":
      return {
        container: "bg-[#F1F5F9]",
        text: "text-[#64748B]",
        label: "Tenant",
      };
    default: {
      const exhaustive: never = role;
      return exhaustive;
    }
  }
}

export default function ResidentStatusBadge({ role }: ResidentStatusBadgeProps) {
  const styles = getRoleStyles(role);

  return (
    <View className={`rounded-full px-2.5 py-0.5 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {styles.label}
      </Text>
    </View>
  );
}
