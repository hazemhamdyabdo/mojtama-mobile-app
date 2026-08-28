import { colors } from "@/theme/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { I18nManager, TextInput, View } from "react-native";

type DocumentsSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export default function DocumentsSearchBar({
  value,
  onChangeText,
}: DocumentsSearchBarProps) {
  const { t } = useTranslation();
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="relative mb-5">
      <View pointerEvents="none" className="absolute top-3.5 left-4 z-10">
        <MaterialDesignIcons name="magnify" color={colors.primary} size={20} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={t("documents.search.placeholder")}
        placeholderTextColor={colors.secText}
        className="rounded-full border border-card-border bg-white py-3.5 pl-11 pr-4 text-base text-heading"
        style={{ textAlign }}
      />
    </View>
  );
}
