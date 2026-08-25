import NotificationListItem from "@/features/notifications/components/NotificationListItem";
import NotificationsHeader from "@/features/notifications/components/NotificationsHeader";
import { INBOX_NOTIFICATIONS } from "@/features/notifications/constants/inbox";
import type { InboxNotification } from "@/features/notifications/types";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
    </SafeAreaView>
  );
}
