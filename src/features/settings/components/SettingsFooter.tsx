import { APP_BUILD, APP_VERSION } from "@/features/settings/constants/dummy";
import { Text, View } from "react-native";

export default function SettingsFooter() {
  return (
    <View className="items-center py-6">
      <Text className="text-sm text-sec-text">
        Mojtama V.{APP_VERSION} ({APP_BUILD})
      </Text>
      <Text className="mt-1 text-sm text-sec-text">© 2025 Mojtama LLC</Text>
    </View>
  );
}
