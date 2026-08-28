export type SuggestionActionId =
  | "add-service"
  | "create-announcement"
  | "create-poll"
  | "schedule-meeting";

export type SuggestionAction = {
  id: SuggestionActionId;
  icon: "briefcase-outline" | "bullhorn-outline" | "chart-bar" | "account-group-outline";
  responseType: "service-added" | "text";
  responseText?: string;
};

export type ServiceAddedDetails = {
  price: string;
  duration: string;
  addedOn: string;
};

export type ChatMessage =
  | {
      id: string;
      type: "date";
      label: string;
    }
  | {
      id: string;
      type: "ai-text";
      text: string;
      time: string;
    }
  | {
      id: string;
      type: "user-text";
      text: string;
      time: string;
    }
  | {
      id: string;
      type: "user-attachment";
      uri: string;
      fileName?: string;
      time: string;
    }
  | {
      id: string;
      type: "service-added";
      serviceName: string;
      time: string;
      details: ServiceAddedDetails;
    };
