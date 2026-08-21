import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";

type ResidentRoleCardProps = {
  onPress: () => void;
};

export default function ResidentRoleCard({ onPress }: ResidentRoleCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      className="relative min-h-31.5 w-full justify-center rounded-2xl bg-[#7B61FF] py-4 pl-28 pr-4 active:opacity-[0.92]"
    >
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

      <View className="flex-col items-center">
        <View className="flex-col items-center">
          <Text className="z-0 mb-1 text-sm font-normal text-[#E2E8F0]">
            {t("auth.registerAs")}
          </Text>
          <Text className="z-0 text-2xl font-bold tracking-[-0.3px] text-white">
            {t("auth.roles.resident")}
          </Text>
        </View>
      </View>

      <Image
        source={require("@/assets/images/auth/white-lines.png")}
        className="absolute bottom-3 right-0 h-full w-full"
      />
    </Pressable>
  );
}
