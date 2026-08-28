import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";

type ManagerRoleCardProps = {
  onPress: () => void;
};

export default function ManagerRoleCard({ onPress }: ManagerRoleCardProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onPress}
      className="relative min-h-31.5 w-full justify-center rounded-2xl bg-primary-100 py-4 pl-6 pr-4 active:opacity-[0.92]"
    >
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

      <View className="w-full flex-col items-start justify-start">
        <Image
          source={require("@/assets/images/auth/blue-lines.png")}
          className="absolute -top-8.25 left-18"
        />
        <View className="w-full flex-col items-start justify-start text-left">
          <Text className="z-0 mb-1 text-sm font-normal text-label">
            {t("auth.registerAs")}
          </Text>
          <Text className="z-0 text-2xl font-bold tracking-[-0.3px] text-label">
            {t("auth.roles.manager")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
