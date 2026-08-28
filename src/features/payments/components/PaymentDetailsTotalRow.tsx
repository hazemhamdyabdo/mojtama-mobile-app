import { Text, View } from "react-native";

type PaymentDetailsTotalRowProps = {
  total: string;
};

export default function PaymentDetailsTotalRow({
  total,
}: PaymentDetailsTotalRowProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <Text className="text-base font-bold text-heading">Total</Text>
      <Text className="text-base font-bold text-primary">{total}</Text>
    </View>
  );
}
