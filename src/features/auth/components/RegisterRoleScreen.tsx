import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Role = "resident" | "manager";

type RoleCardProps = {
  title: string;
  subtitle: string;
  imageSource: number;
  imagePosition: "left" | "right";
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  onPress: () => void;
};

function mirrorImagePosition(position: "left" | "right"): "left" | "right" {
  if (!I18nManager.isRTL) {
    return position;
  }

  return position === "left" ? "right" : "left";
}

function RoleCard({
  title,
  subtitle,
  imageSource,
  imagePosition,
  backgroundColor,
  titleColor,
  subtitleColor,
  onPress,
}: RoleCardProps) {
  const resolvedImagePosition = mirrorImagePosition(imagePosition);

  const textContent = (
    <View className="flex-1 justify-center px-4.5 py-4">
      <Text
        className="mb-1 text-sm font-normal"
        style={{ color: subtitleColor }}
      >
        {subtitle}
      </Text>
      <Text
        className="text-2xl font-bold tracking-[-0.3px]"
        style={{ color: titleColor }}
      >
        {title}
      </Text>
    </View>
  );

  const imageContent = (
    <Image
      source={imageSource}
      className="w-full h-full"
      resizeMode="contain"
    />
  );

  return (
    <Pressable
      className="flex-row items-stretch overflow-hidden rounded-[14px] active:opacity-[0.92]"
      style={{ backgroundColor }}
    >
      {resolvedImagePosition === "left" ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </Pressable>
  );
}

export default function RegisterRoleScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleRolePress = (role: Role) => {
    router.push({
      pathname: "/register",
      params: { role },
    });
  };

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
            {/* Resident Role Card */}
            <View className="relative bg-[#7B61FF] w-full rounded-2xl min-h-31.5 justify-center pl-28 pr-4 py-4">
              <Image
                source={require("@/assets/images/auth/still-life-keys-new-home.png")}
                resizeMode="contain"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 127,
                  zIndex: 10,
                }}
              />

              <View className="flex-col items-center  ">
                <View className="flex-col items-center">
                  <Text className="text-[#E2E8F0] text-sm font-normal z-0 mb-1">
                    {t("auth.registerAs")}
                  </Text>
                  <Text className="text-white text-2xl font-bold z-0 tracking-[-0.3px]">
                    {t("auth.roles.resident")}
                  </Text>
                </View>
              </View>
              <Image
                source={require("@/assets/images/auth/white-lines.png")}
                className="w-full h-full absolute bottom-3 right-0"
              />
            </View>

            {/* Manager Role Card */}
            <View className="relative bg-[#EBE8FF] w-full rounded-2xl min-h-31.5 justify-center pl-6 pr-4 py-4">
              <Image
                source={require("@/assets/images/auth/hand-presenting-model-house-home-loan-campaign.png")}
                resizeMode="contain"
                style={{
                  position: "absolute",
                  top: -20,
                  right: 0,
                  width: 150,
                  height: 132,
                  zIndex: 10,
                }}
              />

              <View className="flex-col items-start  justify-start w-full">
                <Image
                  source={require("@/assets/images/auth/blue-lines.png")}
                  className=" absolute -top-8.25 left-18"
                />
                <View className="flex-col items-start justify-start text-left w-full">
                  <Text className="text-[#2E2E2E] text-sm font-normal z-0 mb-1">
                    {t("auth.registerAs")}
                  </Text>
                  <Text className="text-[#2E2E2E] text-2xl font-bold z-0 tracking-[-0.3px]">
                    {t("auth.roles.manager")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
