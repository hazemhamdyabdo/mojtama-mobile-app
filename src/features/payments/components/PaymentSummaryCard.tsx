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
    <View className="flex-1 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="size-10 items-center justify-center rounded-xl bg-[#F0EDFF]">
        <MaterialDesignIcons name={icon} color="#7B61FF" size={22} />
      </View>
      <Text className="mt-3 text-sm text-[#90A1B9]">{label}</Text>
      <Text className="mt-1 text-lg font-bold text-[#1F1F1F]">{amount}</Text>
    </View>
  );
}
