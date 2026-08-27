import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";

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
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="mb-4 flex-row items-center gap-3">
      <View className="relative flex-1">
        <View pointerEvents="none" className="absolute top-3.5 left-4 z-10">
          <MaterialDesignIcons name="magnify" color="#7B61FF" size={20} />
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search residents.."
          placeholderTextColor="#90A1B9"
          className="rounded-full border border-[#E4E4E7] bg-white py-3.5 pl-11 pr-4 text-base text-[#1F1F1F]"
          style={{ textAlign }}
        />
      </View>

      <Pressable
        onPress={onFilterPress}
        accessibilityRole="button"
        accessibilityLabel="Filter residents"
        className="items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white px-3 py-2.5 active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="filter-variant" color="#64748B" size={20} />
        <Text className="mt-0.5 text-xs font-medium text-[#64748B]">Filter</Text>
      </Pressable>
    </View>
  );
}
