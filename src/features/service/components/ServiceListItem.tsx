import { colors } from "@/theme/colors";
import type { ServiceItem, ServiceRole } from "@/features/service/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type ServiceListItemProps = {
  item: ServiceItem;
  variant?: ServiceRole;
  onPress?: (itemId: string) => void;
};

function ServiceListItemIcon({ item }: { item: ServiceItem }) {
  const { t } = useTranslation();

  if (item.icon === "sos") {
    return (
      <View className="size-12 items-center justify-center rounded-full bg-primary-50">
        <Text className="text-xs font-bold text-primary">{t("service.sos")}</Text>
      </View>
    );
  }

  return (
    <View className="size-12 items-center justify-center rounded-full bg-primary-50">
      <MaterialDesignIcons name={item.icon} color={colors.primary} size={24} />
    </View>
  );
}

function getDescriptionKey(itemId: string, variant: ServiceRole) {
  if (itemId === "request" && variant === "resident") {
    return `service.items.${itemId}.residentDescription`;
  }

  if (itemId === "request" && variant === "admin") {
    return `service.items.${itemId}.adminDescription`;
  }

  return `service.items.${itemId}.description`;
}

export default function ServiceListItem({
  item,
  variant = "admin",
  onPress,
}: ServiceListItemProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={() => onPress?.(item.id)}
      accessibilityRole="button"
      className="mb-3 flex-row items-center rounded-2xl border border-card-border bg-white p-4 active:opacity-[0.92]"
    >
      <ServiceListItemIcon item={item} />

      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-heading">
          {t(`service.items.${item.id}.title`)}
        </Text>
        <Text className="mt-1 text-sm leading-5 text-sec-text">
          {t(getDescriptionKey(item.id, variant))}
        </Text>
      </View>
    </Pressable>
  );
}
