import { Text, View } from "react-native";

type PaymentDetailsInvoiceHeaderProps = {
  invoiceNumber: string;
};

export default function PaymentDetailsInvoiceHeader({
  invoiceNumber,
}: PaymentDetailsInvoiceHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-base font-bold text-heading">Invoice</Text>
      <View className="items-end">
        <Text className="text-xs text-sec-text">Invoice No.</Text>
        <Text className="text-sm font-bold text-heading">{invoiceNumber}</Text>
      </View>
    </View>
  );
}
