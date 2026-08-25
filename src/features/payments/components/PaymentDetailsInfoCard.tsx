import { Text, View } from "react-native";

type InfoColumn = {
  label: string;
  value: string;
};

type PaymentDetailsInfoCardProps = {
  columns: InfoColumn[];
};

export default function PaymentDetailsInfoCard({
  columns,
}: PaymentDetailsInfoCardProps) {
  return (
    <View className="mb-4 flex-row rounded-2xl bg-[#F8FAFC] p-4">
      {columns.map((column, index) => (
        <View
          key={column.label}
          className={`flex-1 ${index < columns.length - 1 ? "pr-2" : ""}`}
        >
          <Text className="text-xs text-[#90A1B9]">{column.label}</Text>
          <Text className="mt-1 text-sm font-bold text-[#1F1F1F]">
            {column.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
