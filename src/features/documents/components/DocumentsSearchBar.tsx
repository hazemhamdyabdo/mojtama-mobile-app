import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { I18nManager, TextInput, View } from "react-native";

type DocumentsSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function DocumentsSearchBar({
  value,
  onChangeText,
}: DocumentsSearchBarProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="relative mb-5">
      <View pointerEvents="none" className="absolute top-3.5 left-4 z-10">
        <MaterialDesignIcons name="magnify" color="#7B61FF" size={20} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search documents"
        placeholderTextColor="#90A1B9"
        className="rounded-full border border-[#E4E4E7] bg-white py-3.5 pl-11 pr-4 text-base text-[#1F1F1F]"
        style={{ textAlign }}
      />
    </View>
  );
}
