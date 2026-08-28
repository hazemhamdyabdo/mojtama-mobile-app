import type {
  RequestFilter,
  RequestIssueType,
  RequestPriority,
  RequestPriorityOption,
  RequestTypeOption,
  ServiceRequest,
  Worker,
} from "@/features/requests/types";
import { colors } from "@/theme/colors";

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

export const REQUEST_FILTERS: { id: RequestFilter }[] = [
  { id: "all" },
  { id: "maintenance" },
  { id: "noise" },
  { id: "billing" },
  { id: "other" },
];

export const REQUEST_LOCATIONS = ["3A/B", "5A/B", "B-1", "C-3"];

export const REQUEST_TYPE_OPTIONS: RequestTypeOption[] = [
  {
    id: "emergency",
    label: "Emergency",
    icon: "alert-decagram-outline",
    iconColor: colors.rejected,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: "archive-outline",
  },
  {
    id: "noise",
    label: "Noise",
    icon: "ear-hearing",
  },
  {
    id: "security",
    label: "Security",
    icon: "shield-star-outline",
  },
  {
    id: "billing",
    label: "Billing",
    icon: "wallet-outline",
  },
];

export const REQUEST_PRIORITY_OPTIONS: RequestPriorityOption[] = [
  {
    id: "urgent",
    label: "Urgent Request",
    icon: "alert-outline",
    iconColor: colors.rejected,
    iconBackground: "bg-rejected-50",
  },
  {
    id: "high",
    label: "High Priority Request",
    icon: "alert-circle-outline",
    iconColor: colors.pending600,
    iconBackground: "bg-pending-100",
  },
  {
    id: "medium",
    label: "Medium Priority Request",
    icon: "chart-line",
    iconColor: colors.pending,
    iconBackground: "bg-pending-50",
  },
  {
    id: "low",
    label: "low Priority Request",
    icon: "chart-line-variant",
    iconColor: colors.primary700,
    iconBackground: "bg-primary-50",
  },
];

export const REQUEST_PRIORITY_LABELS: Record<RequestPriority, string> = {
  urgent: "Urgent Request",
  high: "High Priority Request",
  medium: "Medium Priority Request",
  low: "low Priority Request",
};

export const REQUEST_PRIORITY_SHORT_LABELS: Record<RequestPriority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "low",
};

export const MAINTENANCE_ISSUE_TYPES = [
  { id: "electricity" as const, label: "Electricity" },
  { id: "plumbing" as const, label: "Plumbing" },
  { id: "hvac" as const, label: "HVAC" },
  { id: "delivery" as const, label: "Delivery" },
];

export const EMERGENCY_ISSUE_TYPES = [
  { id: "fire" as const, label: "Fire" },
  { id: "water-damage" as const, label: "Water damage" },
  { id: "medical" as const, label: "Medical" },
  { id: "security-threat" as const, label: "Security Threat" },
  { id: "electrical" as const, label: "Electrical" },
  { id: "other" as const, label: "Other" },
];

export const DUMMY_WORKERS: Worker[] = [
  { id: "w1", name: "Priya Sharma", role: "worker", avatar: dummyAvatar },
  { id: "w2", name: "Priya Sharma", role: "worker", initials: "PS" },
  { id: "w3", name: "Priya Sharma", role: "worker", initials: "MK" },
  { id: "w4", name: "Priya Sharma", role: "worker", initials: "JS" },
  { id: "w5", name: "Priya Sharma", role: "worker", avatar: dummyAvatar },
];

export const DUMMY_REQUESTS: ServiceRequest[] = [
  {
    id: "r1",
    date: "Oct 24, 2025",
    title: "Elevator malfunction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullDescription:
      "The elevator is currently out of service due to a malfunction. Please use the stairs or contact maintenance assistance contact for immediate support. Our team is working to resolve this as quickly as possible.",
    requestType: "maintenance",
    issueType: "electricity",
    priority: "urgent",
    status: "pending",
    location: "5A/B",
    scheduledDate: "30 December, 2024",
    scheduleTime: "8:00 AM — 9:00 AM",
    submittedBy: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    activities: [],
  },
  {
    id: "r2",
    date: "Oct 24, 2025",
    title: "Elevator malfunction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullDescription:
      "The elevator is currently out of service due to a malfunction. Please use the stairs or contact maintenance assistance contact for immediate support.",
    requestType: "maintenance",
    issueType: "electricity",
    priority: "low",
    status: "assigned",
    location: "5A/B",
    scheduledDate: "30 December, 2024",
    scheduleTime: "8:00 AM — 9:00 AM",
    submittedBy: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    assignedTo: {
      name: "Jade Smith",
      avatar: dummyAvatar,
    },
    assignedWorkerIds: ["w1"],
    activities: [
      {
        id: "a1",
        title: "Status Changed",
        actor: "Alex Gargov",
        timestamp: "Oct 24, 2025 at 4:30PM",
        occurredAt: 1_761_312_600_000,
        fromStatus: "submitted",
        toStatus: "in-progress",
        actorAvatar: dummyAvatar,
      },
      {
        id: "a2",
        title: "Request Submitted",
        actor: "Alex Gargov",
        timestamp: "Oct 24, 2025 at 4:30PM",
        occurredAt: 1_761_312_000_000,
        actorAvatar: dummyAvatar,
      },
    ],
  },
  {
    id: "r3",
    date: "Oct 23, 2025",
    title: "Loud music after hours",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullDescription:
      "Residents in unit 5A/B reported loud music playing after community quiet hours. Please investigate and follow up with the resident.",
    requestType: "noise",
    priority: "medium",
    status: "pending",
    location: "5A/B",
    submittedBy: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    activities: [],
  },
  {
    id: "r4",
    date: "Oct 22, 2025",
    title: "Monthly billing discrepancy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullDescription:
      "There is a discrepancy in the monthly community billing statement. Please review the charges and provide clarification.",
    requestType: "billing",
    priority: "medium",
    status: "pending",
    location: "3A/B",
    submittedBy: {
      name: "Omar Essam",
      unit: "3A/B",
      avatar: dummyAvatar,
    },
    activities: [],
  },
  {
    id: "r5",
    date: "Oct 21, 2025",
    title: "Gas Leak",
    description:
      "The elevator is currently out of service due to a malfunction. Please use the stairs or contact maintenance assistance.",
    fullDescription:
      "Strong smell of gas reported near the building entrance. Immediate attention required. Residents have been advised to evacuate the area.",
    requestType: "emergency",
    issueType: "fire",
    priority: "urgent",
    status: "assigned",
    location: "5A/B",
    submittedBy: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    assignedTo: {
      name: "Jade Smith",
      avatar: dummyAvatar,
    },
    activities: [
      {
        id: "a5-1",
        title: "Status Changed",
        actor: "Alex Gargov",
        timestamp: "Oct 24, 2025 at 4:30PM",
        occurredAt: 1_761_312_000_000,
        actorAvatar: dummyAvatar,
        fromStatus: "submitted",
        toStatus: "in-progress",
      },
      {
        id: "a5-2",
        title: "Request Submitted",
        actor: "Alex Gargov",
        timestamp: "Oct 24, 2025 at 4:30PM",
        occurredAt: 1_761_308_400_000,
        actorAvatar: dummyAvatar,
      },
    ],
  },
];

export function getRequestById(requestId: string): ServiceRequest | undefined {
  return DUMMY_REQUESTS.find((request) => request.id === requestId);
}

export function matchesRequestFilter(
  request: ServiceRequest,
  filter: RequestFilter,
): boolean {
  if (filter === "all") {
    return true;
  }

  if (filter === "other") {
    return ["emergency", "security"].includes(request.requestType);
  }

  return request.requestType === filter;
}

export const REQUEST_TYPE_LABELS: Record<ServiceRequest["requestType"], string> =
  {
    emergency: "Emergency",
    maintenance: "Maintenance",
    noise: "Noise",
    security: "Security",
    billing: "Billing",
  };

export const REQUEST_ISSUE_TYPE_LABELS: Record<RequestIssueType, string> = {
  electricity: "Electricity",
  plumbing: "Plumbing",
  hvac: "HVAC",
  delivery: "Delivery",
  fire: "Fire",
  "water-damage": "Water damage",
  medical: "Medical",
  "security-threat": "Security Threat",
  electrical: "Electrical",
  other: "Other",
};

export function getIssueTypeOptionsForRequestType(
  requestType: ServiceRequest["requestType"] | "",
) {
  if (requestType === "maintenance") {
    return MAINTENANCE_ISSUE_TYPES;
  }

  if (requestType === "emergency") {
    return EMERGENCY_ISSUE_TYPES;
  }

  return [];
}
