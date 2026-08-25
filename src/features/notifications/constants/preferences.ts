import type {
  NotificationPreference,
  NotificationPreferencesState,
} from "@/features/notifications/types";

export const NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  {
    id: "enableNotifications",
    title: "Enable Notifications",
    description: "Set this as a priority to ensure quick response.",
  },
  {
    id: "emergencyFeed",
    title: "Emergency Feed",
    description: "Mark as Urgent for immediate attention",
  },
  {
    id: "userFeedback",
    title: "User Feedback",
    description: "Collect and analyze user input to improve services.",
  },
  {
    id: "scheduledMaintenance",
    title: "Scheduled Maintenance",
    description:
      "Inform users about upcoming service interruptions in advance.",
  },
  {
    id: "featureUpdates",
    title: "Feature Updates",
    description:
      "Notify users of new functionalities and enhancements added to the service.",
  },
];

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferencesState = {
  enableNotifications: true,
  emergencyFeed: false,
  userFeedback: false,
  scheduledMaintenance: true,
  featureUpdates: true,
};
