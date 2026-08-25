import { EMERGENCY_TIPS } from "@/features/help/constants/dummy";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

export default function EmergencyTipsCard() {
  return (
    <View className="rounded-2xl bg-[#F0EDFF] p-4">
      <View className="flex-row items-center">
        <MaterialDesignIcons
          name="shield-check-outline"
          color="#7B61FF"
          size={22}
        />
        <Text className="ml-2 text-base font-bold text-[#1F1F1F]">
          Emergency Tips
        </Text>
      </View>

      <Text className="mt-2 text-sm leading-5 text-[#64748B]">
        Can't Find What You're Looking For? Contact Our Support Team:
      </Text>

      <View className="mt-3 gap-2">
        {EMERGENCY_TIPS.map((tip) => (
          <View key={tip} className="rounded-xl bg-[#E4D9FF] px-4 py-3">
            <Text className="text-sm leading-5 text-[#1F1F1F]">{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
