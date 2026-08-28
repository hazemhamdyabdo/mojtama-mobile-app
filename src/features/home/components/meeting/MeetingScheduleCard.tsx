import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type MeetingScheduleCardProps = {
  label: string;
  value: string;
  icon: "calendar" | "clock";
};

export default function MeetingScheduleCard({
  label,
  value,
  icon,
}: MeetingScheduleCardProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
      <Text className="text-sm font-semibold text-heading">{label}</Text>
      <View className="flex-row items-center gap-1.5">
        <MaterialDesignIcons
          name={
            icon === "calendar" ? "calendar-blank-outline" : "clock-outline"
          }
          color={colors.slate500}
          size={16}
        />
        <Text className="text-sm text-slate-500">{value}</Text>
      </View>
    </View>
  );
}
