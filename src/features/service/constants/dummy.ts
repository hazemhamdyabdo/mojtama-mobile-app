import type {
  CommunityOverviewMetric,
  ServiceItem,
} from "@/features/service/types";

export const SERVICE_USER = {
  name: "Omar",
  unit: "Unit 32 T",
  avatar: require("@/features/home/constants/dummy-avatar.jpg"),
  notificationCount: 3,
};

export const ADMIN_OVERVIEW_METRICS: CommunityOverviewMetric[] = [
  {
    id: "total-meetings",
    label: "Total Meetings",
    value: 16,
    icon: "account-group-outline",
  },
  {
    id: "total-members",
    label: "Total Members",
    value: 20,
    icon: "account-multiple-outline",
  },
  {
    id: "upcoming-meetings",
    label: "Upcoming Meetings",
    value: 4,
    icon: "calendar-clock-outline",
  },
  {
    id: "help-desk",
    label: "Help Desk",
    value: 14,
    icon: "comment-question-outline",
  },
  {
    id: "all-visitor",
    label: "All Visitor",
    value: 13,
    icon: "account-multiple-outline",
  },
  {
    id: "announcements",
    label: "Announcements",
    value: 14,
    icon: "bullhorn-outline",
  },
  {
    id: "overdue-bills",
    label: "Overdue Bills",
    value: 4,
    icon: "clock-alert-outline",
  },
];

export const ADMIN_SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "request",
    title: "Request",
    description: "Create And Monitor Service Requests In One Place",
    icon: "archive-outline",
  },
  {
    id: "residents",
    title: "Residents",
    description: "Invite Residents And Manage Them All",
    icon: "account-group-outline",
  },
  {
    id: "visitors",
    title: "Visitors",
    description: "Invite Guests And Manage Visitor Permissions.",
    icon: "qrcode-scan",
  },
  {
    id: "meeting",
    title: "Meeting",
    description: "Reserve Facilities For Meetings And Events.",
    icon: "account-group-outline",
  },
  {
    id: "emergency",
    title: "Emergency",
    description: "Get Emergency Assistance Whenever You Need It.",
    icon: "sos",
  },
  {
    id: "payments",
    title: "Payments",
    description: "Securely Manage All Community Payments.",
    icon: "cash-multiple",
  },
];

export const RESIDENT_SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "request",
    title: "Request",
    description: "Submit And Track Your Service Requests",
    icon: "archive-outline",
  },
  {
    id: "visitors",
    title: "Visitors",
    description: "Invite Guests And Manage Visitor Permissions.",
    icon: "qrcode-scan",
  },
  {
    id: "meeting",
    title: "Meeting",
    description: "Reserve Facilities For Meetings And Events.",
    icon: "account-group-outline",
  },
  {
    id: "emergency",
    title: "Emergency",
    description: "Get Emergency Assistance Whenever You Need It.",
    icon: "sos",
  },
  {
    id: "payments",
    title: "Payments",
    description: "Securely Manage All Community Payments.",
    icon: "cash-multiple",
  },
];
