import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import ManagerRoleCard from "@/features/auth/components/ManagerRoleCard";
import ResidentRoleCard from "@/features/auth/components/ResidentRoleCard";
import { useRouter } from "expo-router";
import { Image, ImageBackground, View } from "react-native";

type Role = "resident" | "manager";

export default function RegisterRoleScreen() {
  const router = useRouter();

  const handleRolePress = (role: Role) => {
    router.push({
      pathname: "/language-choice",
      params: { role },
    });
  };

  return (
    <ScreenSafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.white,
        height: "100%",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/auth/onboarding-waves.png")}
        resizeMode="cover"
        className="flex-1 px-6 justify-center gap-20 "
        style={{ flex: 1 }}
      >
        <View className=" items-center justify-center ">
          <Image
            source={require("@/assets/images/auth/logo-text.png")}
            resizeMode="contain"
            className=" w-full"
          />
        </View>
        <View className=" items-center justify-center px-4">
          <View className="w-full gap-18">
            <ResidentRoleCard onPress={() => handleRolePress("resident")} />
            <ManagerRoleCard onPress={() => handleRolePress("manager")} />
          </View>
        </View>
      </ImageBackground>
    </ScreenSafeAreaView>
  );
}
