import { colors } from "@/theme/colors";
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
        selected ? "border-primary bg-primary-50" : "border-card-border bg-white"
      }`}
    >
      <View className="size-12 items-center justify-center rounded-full bg-primary-50">
        <MaterialDesignIcons name={icon} color={colors.primary} size={24} />
      </View>
      <Text
        className={`mt-3 text-center text-sm font-semibold ${
          selected ? "text-primary" : "text-heading"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
