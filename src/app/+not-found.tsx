import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("errors.notFound")}</Text>
    </View>
  );
}
