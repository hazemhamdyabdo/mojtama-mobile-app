import type { ImageSourcePropType } from "react-native";

export type RequestFilter =
  | "all"
  | "maintenance"
  | "noise"
  | "billing"
  | "other";

export type RequestType =
  | "emergency"
  | "maintenance"
  | "noise"
  | "security"
  | "billing";

export type MaintenanceIssueType =
  | "electricity"
  | "plumbing"
  | "hvac"
  | "delivery";

export type EmergencyIssueType =
  | "fire"
  | "water-damage"
  | "medical"
  | "security-threat"
  | "electrical"
  | "other";

export type RequestIssueType = MaintenanceIssueType | EmergencyIssueType;

export type RequestPriority = "urgent" | "high" | "medium" | "low";

export type RequestStatus = "pending" | "assigned" | "in-progress" | "submitted";

export type RequestPerson = {
  name: string;
  unit?: string;
  avatar?: ImageSourcePropType;
};

export type RequestActivity = {
  id: string;
  title: string;
  actor: string;
  timestamp: string;
  occurredAt: number;
  fromStatus?: RequestStatus;
  toStatus?: RequestStatus;
  actorAvatar?: ImageSourcePropType;
};

export type ServiceRequest = {
  id: string;
  date: string;
  title: string;
  description: string;
  fullDescription: string;
  requestType: RequestType;
  issueType?: RequestIssueType;
  priority: RequestPriority;
  status: RequestStatus;
  location: string;
  scheduledDate?: string;
  scheduleTime?: string;
  submittedBy: RequestPerson;
  assignedTo?: RequestPerson;
  assignedWorkerIds?: string[];
  activities: RequestActivity[];
};

export type Worker = {
  id: string;
  name: string;
  role: string;
  avatar?: ImageSourcePropType;
  initials?: string;
};

export type RequestTypeOption = {
  id: RequestType;
  label: string;
  icon: "alert-decagram-outline" | "archive-outline" | "ear-hearing" | "shield-star-outline" | "wallet-outline";
  iconColor?: string;
};

export type RequestPriorityOption = {
  id: RequestPriority;
  label: string;
  icon:
    | "alert-outline"
    | "alert-circle-outline"
    | "chart-line"
    | "chart-line-variant";
  iconColor: string;
  iconBackground: string;
};
