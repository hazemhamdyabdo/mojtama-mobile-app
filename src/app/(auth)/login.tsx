import { Image, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/auth/onboarding-waves.png")}
        resizeMode="cover"
        className="flex-1 px-6 justify-center gap-20"
        style={{ flex: 1 }}
      >
        <View className=" items-center justify-center ">
          <Image
            source={require("@/assets/images/auth/logo-text.png")}
            resizeMode="contain"
            className=" w-full"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
