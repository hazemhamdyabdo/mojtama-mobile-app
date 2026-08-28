import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { colors } from "@/theme/colors";

type ResidentsSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
};

export default function ResidentsSearchBar({
  value,
  onChangeText,
  onFilterPress,
}: ResidentsSearchBarProps) {
  const { t } = useTranslation();
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="mb-4 flex-row items-center gap-3">
      <View className="relative flex-1">
        <View pointerEvents="none" className="absolute top-3.5 left-4 z-10">
          <MaterialDesignIcons name="magnify" color={colors.primary} size={20} />
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t("residents.search.placeholder")}
          placeholderTextColor={colors.secText}
          className="rounded-full border border-card-border bg-white py-3.5 pl-11 pr-4 text-base text-heading"
          style={{ textAlign }}
        />
      </View>

      <Pressable
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel={t("residents.filter.title")}
        className="items-center justify-center rounded-2xl border border-card-border bg-white px-3 py-2.5 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="filter-variant" color={colors.slate500} size={20} />
        <Text className="mt-0.5 text-xs font-medium text-slate-500">
          {t("residents.filter.label")}
        </Text>
      </Pressable>
    </View>
  );
}
