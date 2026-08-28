import { colors } from "@/theme/colors";
import type { PaymentCompanyInfo } from "@/features/payments/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type PaymentDetailsCompanySectionProps = {
  company: PaymentCompanyInfo;
};

export default function PaymentDetailsCompanySection({
  company,
}: PaymentDetailsCompanySectionProps) {
  return (
    <View className="border-t border-card-border pt-5">
      <View className="flex-row gap-4">
        <View className="size-12 items-center justify-center rounded-xl bg-primary-50">
          <MaterialDesignIcons
            name="domain"
            color={colors.primary}
            size={24}
          />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-bold text-heading">
            {company.name}
          </Text>
          <Text className="mt-0.5 text-xs text-sec-text">{company.address}</Text>
          <Text className="text-xs text-sec-text">{company.email}</Text>
        </View>

        <View className="max-w-[38%]">
          <Text className="text-xs text-sec-text">Additional Notes</Text>
          <Text className="mt-0.5 text-xs text-sec-text">{company.notes}</Text>
        </View>
      </View>
    </View>
  );
}
