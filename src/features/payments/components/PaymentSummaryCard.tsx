import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type PaymentSummaryCardProps = {
  label: string;
  amount: string;
  icon: "credit-card-outline" | "wallet-outline";
};

export default function PaymentSummaryCard({
  label,
  amount,
  icon,
}: PaymentSummaryCardProps) {
  return (
    <View className="flex-1 rounded-2xl border border-card-border bg-white p-4">
      <View className="size-10 items-center justify-center rounded-xl bg-primary-50">
        <MaterialDesignIcons name={icon} color={colors.primary} size={22} />
      </View>
      <Text className="mt-3 text-sm text-sec-text">{label}</Text>
      <Text className="mt-1 text-lg font-bold text-heading">{amount}</Text>
    </View>
  );
}
