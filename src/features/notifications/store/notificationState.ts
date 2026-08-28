import { INBOX_NOTIFICATIONS } from "@/features/notifications/constants/inbox";
import type { InboxNotification } from "@/features/notifications/types";

let notificationsState: InboxNotification[] = [...INBOX_NOTIFICATIONS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getNotificationsState(): InboxNotification[] {
  return notificationsState;
}

export function getUnreadCountFromState(): number {
  return notificationsState.filter((notification) => !notification.isRead).length;
}

export function markNotificationReadInState(
  notificationId: string,
): InboxNotification | undefined {
  let updated: InboxNotification | undefined;

  notificationsState = notificationsState.map((notification) => {
    if (notification.id === notificationId) {
      updated = { ...notification, isRead: true };
      return updated;
    }

    return notification;
  });

  notifyListeners();
  return updated;
}

export function markAllNotificationsReadInState(): void {
  notificationsState = notificationsState.map((notification) => ({
    ...notification,
    isRead: true,
  }));
  notifyListeners();
}

export function subscribeToNotifications(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetNotificationsState(): void {
  notificationsState = [...INBOX_NOTIFICATIONS];
  notifyListeners();
}
