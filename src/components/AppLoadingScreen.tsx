import { ActivityIndicator, Image, Text, View } from "react-native";

const logo = require("@/assets/images/auth/mojtama-logo.png");

export default function AppLoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center">
        <Image
          source={logo}
          resizeMode="contain"
          accessibilityLabel="Mojtama logo"
          style={{ width: 96, height: 96 }}
        />

        <Text className="mt-4 text-[28px] font-semibold tracking-tight text-[#3D3D3D]">
          Mojtama
        </Text>

        <Text className="mt-1 text-lg font-medium text-[#64748B]">مجتمع</Text>

        <ActivityIndicator
          size="small"
          color="#7B61FF"
          style={{ marginTop: 32 }}
        />
      </View>
    </View>
  );
}
