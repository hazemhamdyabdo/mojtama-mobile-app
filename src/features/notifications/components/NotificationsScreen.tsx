import NotificationListItem from "@/features/notifications/components/NotificationListItem";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import NotificationsHeader from "@/features/notifications/components/NotificationsHeader";
import { INBOX_NOTIFICATIONS } from "@/features/notifications/constants/inbox";
import type { InboxNotification } from "@/features/notifications/types";
import { useState } from "react";
import { FlatList } from "react-native";
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(INBOX_NOTIFICATIONS);

  const handleNotificationPress = (notification: InboxNotification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id ? { ...item, isRead: true } : item,
      ),
    );
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-8 pt-4"
        ListHeaderComponent={<NotificationsHeader />}
        renderItem={({ item }) => (
          <NotificationListItem
            notification={item}
            onPress={handleNotificationPress}
          />
        )}
      />
    </ScreenSafeAreaView>
  );
}
