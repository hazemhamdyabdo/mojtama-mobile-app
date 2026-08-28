import { useEffect, useState } from "react";
import {
  getNotificationsState,
  getUnreadCountFromState,
  subscribeToNotifications,
} from "@/features/notifications/store/notificationState";

export function useNotificationsState() {
  const [notifications, setNotifications] = useState(getNotificationsState());
  const [unreadCount, setUnreadCount] = useState(getUnreadCountFromState());

  useEffect(() => {
    return subscribeToNotifications(() => {
      setNotifications(getNotificationsState());
      setUnreadCount(getUnreadCountFromState());
    });
  }, []);

  return { notifications, unreadCount };
}
