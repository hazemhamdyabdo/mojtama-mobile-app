import { colors } from "@/theme/colors";
import type { AttendeeStatus } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type AttendeeStatusBadgeProps = {
  status: AttendeeStatus;
};

export default function AttendeeStatusBadge({ status }: AttendeeStatusBadgeProps) {
  const { t } = useTranslation();

  switch (status) {
    case "attending":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="check-circle-outline"
            color={colors.approved500}
            size={18}
          />
          <Text className="text-sm font-medium text-approved-500">
            {t("home.meeting.attendeeStatus.attending")}
          </Text>
        </View>
      );
    case "declined":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="close-circle-outline"
            color={colors.rejected}
            size={18}
          />
          <Text className="text-sm font-medium text-rejected">
            {t("home.meeting.attendeeStatus.declined")}
          </Text>
        </View>
      );
    case "awaiting":
      return (
        <View className="flex-row items-center gap-1">
          <MaterialDesignIcons
            name="alert-circle-outline"
            color={colors.pending600}
            size={18}
          />
          <Text className="text-sm font-medium text-pending-600">
            {t("home.meeting.attendeeStatus.awaiting")}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
