import { colors } from "@/theme/colors";
import ServiceRoleBadge from "@/features/service/components/ServiceRoleBadge";
import type { ServiceRole } from "@/features/service/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type ServiceHeaderProps = {
  name: string;
  role: ServiceRole;
  subtitle: string;
  avatar: number;
  notificationCount?: number;
  onNotificationsPress?: () => void;
};

export default function ServiceHeader({
  name,
  role,
  subtitle,
  avatar,
  notificationCount = 0,
  onNotificationsPress,
}: ServiceHeaderProps) {
  const showBadge = notificationCount > 0;

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <Image
          source={avatar}
          contentFit="cover"
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />

        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-heading">
              Welcome {name}
            </Text>
            <ServiceRoleBadge role={role} />
          </View>
          <Text className="mt-0.5 text-sm text-sec-text">{subtitle}</Text>
        </View>
      </View>

      <Pressable
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        className="relative size-11 items-center justify-center rounded-full border border-card-border active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="bell-outline" color={colors.primary} size={22} />

        {showBadge ? (
          <View className="absolute -right-0.5 -top-0.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 py-0.5">
            <Text className="text-[10px] font-bold leading-none text-white">
              {notificationCount > 99 ? "99+" : notificationCount}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}
