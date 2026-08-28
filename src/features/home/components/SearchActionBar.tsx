import { colors } from "@/theme/colors";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";

type SearchActionBarProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onAddPostPress?: () => void;
};

export default function SearchActionBar({
  value = "",
  placeholder,
  onChangeText,
  onAddPostPress,
}: SearchActionBarProps) {
  const { t } = useTranslation();
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const resolvedPlaceholder = placeholder ?? t("common.search");

  return (
    <View className="flex-row items-center gap-3">
      <View className="relative flex-1">
        <View
          pointerEvents="none"
          className="absolute top-4 left-3 justify-center items-center z-10"
        >
          <Image
            source={require("@/assets/images/home/search-normal.png")}
            contentFit="contain"
            style={{ width: 18, height: 18 }}
          />
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={resolvedPlaceholder}
          placeholderTextColor={colors.secText}
          className="rounded-xl border border-card-border bg-white pl-11 pr-4 text-base text-heading"
          style={{
            textAlign,
            paddingVertical: 10,
          }}
        />
      </View>

      <Pressable
        onPress={onAddPostPress}
        accessibilityRole="button"
        accessibilityLabel={t("home.addPost")}
        className="items-center justify-center rounded-xl bg-primary px-8 py-3 active:opacity-[0.92]"
      >
        <Text className="text-sm font-bold text-white">+ {t("home.addPost")}</Text>
      </Pressable>
    </View>
  );
}
