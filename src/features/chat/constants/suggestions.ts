import type { SuggestionAction } from "@/features/chat/types";

export const AI_SUGGESTIONS: SuggestionAction[] = [
  {
    id: "add-service",
    label: "Add New Service",
    icon: "briefcase-outline",
    responseType: "service-added",
  },
  {
    id: "create-announcement",
    label: "Create an Announcement",
    icon: "bullhorn-outline",
    responseType: "text",
    responseText:
      "I can help you create an announcement. Tell me the title and message you'd like to share with the community.",
  },
  {
    id: "create-poll",
    label: "Create a Poll",
    icon: "chart-bar",
    responseType: "text",
    responseText:
      "Let's set up your poll. What question would you like to ask, and what options should residents choose from?",
  },
  {
    id: "schedule-meeting",
    label: "Schedule a Meeting",
    icon: "account-group-outline",
    responseType: "text",
    responseText:
      "I can schedule a meeting for you. Share the title, date, time, and whether it should be virtual or in person.",
  },
];

export const WELCOME_MESSAGE =
  "Hello Omar. I'm your AI assistant. I can help You Manage your gym, members, service, and more.";

export const SERVICE_ADDED_DETAILS = {
  price: "$50",
  duration: "60 minutes",
  addedOn: "May 6, 2026 at 9:43 AM",
} as const;
