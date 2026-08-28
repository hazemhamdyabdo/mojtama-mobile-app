import { colors } from "@/theme/colors";
import type { InboxNotification } from "@/features/notifications/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type NotificationListItemProps = {
  notification: InboxNotification;
  onPress?: (notification: InboxNotification) => void;
};

export default function NotificationListItem({
  notification,
  onPress,
}: NotificationListItemProps) {
  return (
    <Pressable
      onPress={() => onPress?.(notification)}
      accessibilityRole="button"
      className={`mb-3 flex-row rounded-2xl px-3 py-3 active:opacity-[0.92] ${
        notification.isRead ? "bg-white" : "bg-slate-50"
      }`}
    >
      <View className="size-12 items-center justify-center rounded-xl bg-primary-50">
        <MaterialDesignIcons
          name={notification.icon}
          color={colors.primary}
          size={22}
        />
      </View>

      <View className="ml-3 flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text className="flex-1 text-base font-semibold text-heading">
            {notification.title}
          </Text>
          {!notification.isRead ? (
            <View className="mt-1 size-2 rounded-full bg-primary" />
          ) : null}
        </View>

        <View className="mt-1 flex-row items-end justify-between gap-2">
          <Text
            numberOfLines={1}
            className="flex-1 text-sm text-slate-500"
          >
            {notification.description}
          </Text>
          <Text className="text-xs text-sec-text">{notification.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
