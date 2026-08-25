import { Text, View } from "react-native";

type PaymentDetailsTotalRowProps = {
  total: string;
};

export default function PaymentDetailsTotalRow({
  total,
}: PaymentDetailsTotalRowProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <Text className="text-base font-bold text-[#1F1F1F]">Total</Text>
      <Text className="text-base font-bold text-[#7B61FF]">{total}</Text>
    </View>
  );
}
