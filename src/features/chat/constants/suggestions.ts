import type { SuggestionAction, SuggestionActionId } from "@/features/chat/types";

export const SUGGESTION_I18N_KEYS: Record<SuggestionActionId, string> = {
  "add-service": "addService",
  "create-announcement": "createAnnouncement",
  "create-poll": "createPoll",
  "schedule-meeting": "scheduleMeeting",
};

export const AI_SUGGESTIONS: SuggestionAction[] = [
  {
    id: "add-service",
    icon: "briefcase-outline",
    responseType: "service-added",
  },
  {
    id: "create-announcement",
    icon: "bullhorn-outline",
    responseType: "text",
    responseText:
      "I can help you create an announcement. Tell me the title and message you'd like to share with the community.",
  },
  {
    id: "create-poll",
    icon: "chart-bar",
    responseType: "text",
    responseText:
      "Let's set up your poll. What question would you like to ask, and what options should residents choose from?",
  },
  {
    id: "schedule-meeting",
    icon: "account-group-outline",
    responseType: "text",
    responseText:
      "I can schedule a meeting for you. Share the title, date, time, and whether it should be virtual or in person.",
  },
];

export const SERVICE_ADDED_DETAILS = {
  price: "$50",
  duration: "60 minutes",
  addedOn: "May 6, 2026 at 9:43 AM",
} as const;
