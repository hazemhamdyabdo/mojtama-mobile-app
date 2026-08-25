import type { PaymentMethodType } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type PaymentMethodOptionCardProps = {
  method: PaymentMethodType;
  label: string;
  icon: "bank-outline" | "wallet-outline";
  selected: boolean;
  onPress: () => void;
};

export default function PaymentMethodOptionCard({
  label,
  icon,
  selected,
  onPress,
}: PaymentMethodOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`flex-1 items-center rounded-2xl border px-3 py-5 active:opacity-[0.92] ${
        selected ? "border-[#7B61FF] bg-[#F8F6FF]" : "border-[#E4E4E7] bg-white"
      }`}
    >
      <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
        <MaterialDesignIcons name={icon} color="#7B61FF" size={24} />
      </View>
      <Text
        className={`mt-3 text-center text-sm font-semibold ${
          selected ? "text-[#7B61FF]" : "text-[#1F1F1F]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
