import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

export default function SettingsPendingVerificationCard() {
  return (
    <View className="mt-8 flex-row rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
        <MaterialDesignIcons
          name="help-circle-outline"
          color="#7B61FF"
          size={22}
        />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-[#1F1F1F]">
          Update Pending Verification
        </Text>
        <Text className="mt-1 text-sm leading-5 text-[#90A1B9]">
          Your Request Will Be Reviewed By The Admin And Updated Within 24 Hours
        </Text>
      </View>
    </View>
  );
}
