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
