import ListSkeleton from "@/components/skeleton/ListSkeleton";
import NotificationListItem from "@/features/notifications/components/NotificationListItem";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import NotificationsHeader from "@/features/notifications/components/NotificationsHeader";
import { getNotifications, markNotificationRead } from "@/features/notifications/api";
import { useNotificationsState } from "@/features/notifications/hooks/useNotificationsState";
import { useMockListFetch } from "@/hooks/useMockListFetch";
import type { InboxNotification } from "@/features/notifications/types";
import { FlatList, View } from "react-native";

export default function NotificationsScreen() {
  const { notifications } = useNotificationsState();
  const isLoadingNotifications = useMockListFetch(getNotifications);

  const handleNotificationPress = (notification: InboxNotification) => {
    void markNotificationRead(notification.id);
  };

  if (isLoadingNotifications) {
    return (
      <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <View className="px-4 pb-8 pt-4">
          <NotificationsHeader />
          <ListSkeleton />
        </View>
      </ScreenSafeAreaView>
    );
  }

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
