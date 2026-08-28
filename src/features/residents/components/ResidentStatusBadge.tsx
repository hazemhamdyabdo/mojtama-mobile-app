import type { ResidentRole } from "@/features/residents/types";
import { translateLabel } from "@/localization/translateLabel";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type ResidentStatusBadgeProps = {
  role: ResidentRole;
};

function getRoleStyles(role: ResidentRole) {
  switch (role) {
    case "owner":
      return {
        container: "bg-primary-50",
        text: "text-primary",
      };
    case "tenant":
      return {
        container: "bg-slate-100",
        text: "text-slate-500",
      };
    default: {
      const exhaustive: never = role;
      return exhaustive;
    }
  }
}

export default function ResidentStatusBadge({ role }: ResidentStatusBadgeProps) {
  const { t } = useTranslation();
  const styles = getRoleStyles(role);

  return (
    <View className={`rounded-full px-2.5 py-0.5 ${styles.container}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>
        {translateLabel(t, "residents.roles", role)}
      </Text>
    </View>
  );
}
