import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type MeetingInfoBlockProps = {
  label: string;
  value: string;
  icon: "calendar" | "clock";
};

export default function MeetingInfoBlock({
  label,
  value,
  icon,
}: MeetingInfoBlockProps) {
  return (
    <View className="mb-2 flex-row items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <Text className="text-sm text-sec-text">{label}</Text>
      <View className="flex-row items-center gap-2">
        <MaterialDesignIcons
          name={
            icon === "calendar" ? "calendar-blank-outline" : "clock-outline"
          }
          color={colors.slate500}
          size={18}
        />
        <Text className="text-sm font-medium text-slate-500">{value}</Text>
      </View>
    </View>
  );
}
