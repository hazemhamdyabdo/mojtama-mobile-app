import type { ServiceRole } from "@/features/service/types";
import { Text, View } from "react-native";

type ServiceRoleBadgeProps = {
  role: ServiceRole;
};

const ROLE_LABELS: Record<ServiceRole, string> = {
  admin: "Admin",
  resident: "Resident",
};

export default function ServiceRoleBadge({ role }: ServiceRoleBadgeProps) {
  return (
    <View className="rounded-full bg-primary-50 px-2.5 py-0.5">
      <Text className="text-xs font-semibold text-primary">
        {ROLE_LABELS[role]}
      </Text>
    </View>
  );
}
