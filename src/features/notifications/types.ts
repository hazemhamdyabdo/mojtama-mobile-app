export type NotificationPreferenceKey =
  | "enableNotifications"
  | "emergencyFeed"
  | "userFeedback"
  | "scheduledMaintenance"
  | "featureUpdates";

export type NotificationPreference = {
  id: NotificationPreferenceKey;
  title: string;
  description: string;
};

export type NotificationPreferencesState = Record<
  NotificationPreferenceKey,
  boolean
>;

export type InboxNotificationIcon =
  | "account-group-outline"
  | "bullhorn-outline"
  | "file-document-outline"
  | "inbox-outline";

export type InboxNotification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: InboxNotificationIcon;
  isRead: boolean;
};
