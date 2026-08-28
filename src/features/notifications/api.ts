import {
  getNotificationsState,
  getUnreadCountFromState,
  markAllNotificationsReadInState,
  markNotificationReadInState,
} from "@/features/notifications/store/notificationState";
import type { InboxNotification } from "@/features/notifications/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getNotifications(): Promise<InboxNotification[]> {
  await mockDelay(200);
  return getNotificationsState();
}

export async function markNotificationRead(
  notificationId: string,
): Promise<InboxNotification> {
  await mockDelay(150);

  const updated = markNotificationReadInState(notificationId);
  if (!updated) {
    throw new MockApiError("Notification not found", 404);
  }

  return updated;
}

export async function markAllNotificationsRead(): Promise<void> {
  await mockDelay(200);
  markAllNotificationsReadInState();
}

export async function getUnreadCount(): Promise<number> {
  await mockDelay(100);
  return getUnreadCountFromState();
}
