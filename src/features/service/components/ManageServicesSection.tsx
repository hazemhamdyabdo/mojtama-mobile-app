import ServiceListItem from "@/features/service/components/ServiceListItem";
import type { ServiceItem } from "@/features/service/types";
import { Text, View } from "react-native";

type ManageServicesSectionProps = {
  title?: string;
  subtitle?: string;
  items: ServiceItem[];
  onItemPress?: (itemId: string) => void;
};

export default function ManageServicesSection({
  title = "Manage Services",
  subtitle,
  items,
  onItemPress,
}: ManageServicesSectionProps) {
  return (
    <View className="mt-8">
      <Text className="text-lg font-bold text-heading">{title}</Text>
      {subtitle ? (
        <Text className="mt-1 text-sm text-sec-text">{subtitle}</Text>
      ) : null}

      <View className="mt-4">
        {items.map((item) => (
          <ServiceListItem
            key={item.id}
            item={item}
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
}
