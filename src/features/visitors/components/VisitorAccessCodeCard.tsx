import { colors } from "@/theme/colors";
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
    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
      <View>
        <Text className="text-sm text-sec-text">Access code</Text>
        <Text className="mt-1 text-lg font-bold text-heading">
          {accessCode}
        </Text>
      </View>

      <Pressable
        onPress={onQrPress}
        accessibilityRole="button"
        accessibilityLabel="Show QR code"
        className="active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="qrcode" color={colors.primary} size={36} />
      </Pressable>
    </View>
  );
}
