import LanguageOptionCard from "@/features/auth/components/LanguageOptionCard";
import {
  changeLanguage,
  getDeviceLanguage,
  type SupportedLanguage,
} from "@/localization/i18n";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const languageOptions = [
  {
    code: "en" as const,
    title: "English",
    subtitle: "English (United States)",
    flag: require("@/assets/images/auth/circle-flags_lang-en-us.png"),
  },
  {
    code: "ar" as const,
    title: "Arabic",
    subtitle: "العربية (المملكة العربية السعودية)",
    flag: require("@/assets/images/auth/circle-flags_sa.png"),
  },
];

export default function LanguageChoice() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(getDeviceLanguage);

  const handleContinue = async () => {
    await changeLanguage(selectedLanguage);
    router.push({
      pathname: "/register",
      params: role ? { role } : undefined,
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
        <View className=" items-center justify-center px-4">
          <View className="w-full gap-6">
            <View className="w-full gap-1">
              <Text className="text-2xl font-semibold">Choose Language</Text>
              <Text className="text-sm text-[#90A1B9]">
                Select the language you prefer to use in the app
              </Text>
            </View>
            <View className="w-full flex-col gap-4">
              {languageOptions.map((option) => (
                <LanguageOptionCard
                  key={option.code}
                  title={option.title}
                  subtitle={option.subtitle}
                  flagSource={option.flag}
                  selected={selectedLanguage === option.code}
                  onPress={() => setSelectedLanguage(option.code)}
                />
              ))}
            </View>

            <Pressable
              onPress={() => void handleContinue()}
              className="mt-2 w-full items-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92]"
            >
              <Text className="text-base font-bold text-white">Continue</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
