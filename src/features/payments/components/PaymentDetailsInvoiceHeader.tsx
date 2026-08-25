import { Text, View } from "react-native";

type PaymentDetailsInvoiceHeaderProps = {
  invoiceNumber: string;
};

export default function PaymentDetailsInvoiceHeader({
  invoiceNumber,
}: PaymentDetailsInvoiceHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-base font-bold text-[#1F1F1F]">Invoice</Text>
      <View className="items-end">
        <Text className="text-xs text-[#90A1B9]">Invoice No.</Text>
        <Text className="text-sm font-bold text-[#1F1F1F]">{invoiceNumber}</Text>
      </View>
    </View>
  );
}
