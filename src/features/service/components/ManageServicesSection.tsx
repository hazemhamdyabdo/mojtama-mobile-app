import ServiceListItem from "@/features/service/components/ServiceListItem";
import type { ServiceItem, ServiceRole } from "@/features/service/types";
import { Text, View } from "react-native";

type ManageServicesSectionProps = {
  title?: string;
  subtitle?: string;
  items: ServiceItem[];
  variant?: ServiceRole;
  onItemPress?: (itemId: string) => void;
};

export default function ManageServicesSection({
  title,
  subtitle,
  items,
  variant = "admin",
  onItemPress,
}: ManageServicesSectionProps) {
  return (
    <View className="mt-8">
      {title ? (
        <Text className="text-lg font-bold text-heading">{title}</Text>
      ) : null}
      {subtitle ? (
        <Text className="mt-1 text-sm text-sec-text">{subtitle}</Text>
      ) : null}

      <View className="mt-4">
        {items.map((item) => (
          <ServiceListItem
            key={item.id}
            item={item}
            variant={variant}
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
}
