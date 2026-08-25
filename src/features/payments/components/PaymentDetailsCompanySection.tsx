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
    <View className="border-t border-[#E4E4E7] pt-5">
      <View className="flex-row gap-4">
        <View className="size-12 items-center justify-center rounded-xl bg-[#F0EDFF]">
          <MaterialDesignIcons
            name="domain"
            color="#7B61FF"
            size={24}
          />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-bold text-[#1F1F1F]">
            {company.name}
          </Text>
          <Text className="mt-0.5 text-xs text-[#90A1B9]">{company.address}</Text>
          <Text className="text-xs text-[#90A1B9]">{company.email}</Text>
        </View>

        <View className="max-w-[38%]">
          <Text className="text-xs text-[#90A1B9]">Additional Notes</Text>
          <Text className="mt-0.5 text-xs text-[#90A1B9]">{company.notes}</Text>
        </View>
      </View>
    </View>
  );
}
