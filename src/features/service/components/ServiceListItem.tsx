import type { ServiceItem } from "@/features/service/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type ServiceListItemProps = {
  item: ServiceItem;
  onPress?: (itemId: string) => void;
};

function ServiceListItemIcon({ item }: { item: ServiceItem }) {
  if (item.icon === "sos") {
    return (
      <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
        <Text className="text-xs font-bold text-[#7B61FF]">SOS</Text>
      </View>
    );
  }

  return (
    <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
      <MaterialDesignIcons name={item.icon} color="#7B61FF" size={24} />
    </View>
  );
}

export default function ServiceListItem({
  item,
  onPress,
}: ServiceListItemProps) {
  return (
    <Pressable
      onPress={() => onPress?.(item.id)}
      accessibilityRole="button"
      className="mb-3 flex-row items-center rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
    >
      <ServiceListItemIcon item={item} />

      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-[#1F1F1F]">{item.title}</Text>
        <Text className="mt-1 text-sm leading-5 text-[#90A1B9]">
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
}
