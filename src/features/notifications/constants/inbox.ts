import type { InboxNotification } from "@/features/notifications/types";

export const INBOX_NOTIFICATIONS: InboxNotification[] = [
  {
    id: "1",
    title: "New Meeting Scheduled",
    description: "Board meeting on Sept 25 at 6:00...",
    time: "14m ago",
    icon: "account-group-outline",
    isRead: false,
  },
  {
    id: "2",
    title: "Voting Open",
    description: "Board meeting on Sept 25 at 6:00...",
    time: "14m ago",
    icon: "bullhorn-outline",
    isRead: true,
  },
  {
    id: "3",
    title: "Invoice Issued",
    description: "Board meeting on Sept 25 at 6:00...",
    time: "14m ago",
    icon: "file-document-outline",
    isRead: true,
  },
  {
    id: "4",
    title: "Request Update",
    description: "Board meeting on Sept 25 at 6:00...",
    time: "14m ago",
    icon: "inbox-outline",
    isRead: false,
  },
];
