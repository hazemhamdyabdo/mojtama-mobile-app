import { colors } from "@/theme/colors";
import type { AdminResponse } from "@/features/profile/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type AdminResponseCardProps = {
  response: AdminResponse;
};

export default function AdminResponseCard({ response }: AdminResponseCardProps) {
  return (
    <View className="mt-4 rounded-xl bg-slate-50 px-3 py-3">
      <View className="flex-row items-center gap-2">
        <MaterialDesignIcons
          name="shield-check-outline"
          color={colors.primary}
          size={18}
        />
        <Text className="text-sm font-semibold text-heading">
          Admin Response
        </Text>
      </View>
      <Text className="mt-2 text-sm leading-5 text-slate-500">
        {response.message}
      </Text>
    </View>
  );
}
