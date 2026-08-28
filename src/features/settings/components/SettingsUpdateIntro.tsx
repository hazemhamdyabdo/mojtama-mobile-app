import { Text, View } from "react-native";

type SettingsUpdateIntroProps = {
  title: string;
  subtitle: string;
};

export default function SettingsUpdateIntro({
  title,
  subtitle,
}: SettingsUpdateIntroProps) {
  return (
    <View className="mb-8">
      <Text className="text-2xl font-bold text-heading">{title}</Text>
      <Text className="mt-1 text-sm text-sec-text">{subtitle}</Text>
    </View>
  );
}
