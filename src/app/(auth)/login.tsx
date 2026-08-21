import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("auth.login")}</Text>
    </View>
  );
}
