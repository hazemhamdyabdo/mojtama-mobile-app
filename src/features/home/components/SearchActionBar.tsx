import { Image } from "expo-image";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";

type SearchActionBarProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onAddPostPress?: () => void;
};

export default function SearchActionBar({
  value = "",
  placeholder = "Search",
  onChangeText,
  onAddPostPress,
}: SearchActionBarProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";

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
          placeholder={placeholder}
          placeholderTextColor="#90A1B9"
          className="rounded-xl border border-[#E4E4E7] bg-white pl-11 pr-4 text-base text-[#1F1F1F]"
          style={{
            textAlign,
            minHeight: 48,
            paddingVertical: 12,
          }}
        />
      </View>

      <Pressable
        onPress={onAddPostPress}
        accessibilityRole="button"
        accessibilityLabel="Add post"
        className="items-center justify-center rounded-xl bg-[#7B61FF] px-8 py-4 active:opacity-[0.92]"
      >
        <Text className="text-sm font-bold text-white">+ Add Post</Text>
      </Pressable>
    </View>
  );
}
