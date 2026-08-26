import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type VisitorAccessCodeCardProps = {
  accessCode: string;
  onQrPress?: () => void;
};

export default function VisitorAccessCodeCard({
  accessCode,
  onQrPress,
}: VisitorAccessCodeCardProps) {
  return (
    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-[#F8FAFC] p-4">
      <View>
        <Text className="text-sm text-[#90A1B9]">Access code</Text>
        <Text className="mt-1 text-lg font-bold text-[#1F1F1F]">
          {accessCode}
        </Text>
      </View>

      <Pressable
        onPress={onQrPress}
        accessibilityRole="button"
        accessibilityLabel="Show QR code"
        className="active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="qrcode" color="#7B61FF" size={36} />
      </Pressable>
    </View>
  );
}
