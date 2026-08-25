import type { ImageSourcePropType } from "react-native";

export type ProfileTab = "support-requests" | "payments" | "visitations";

export type ProfileUnit = {
  id: string;
  label: string;
};

export type UserProfile = {
  name: string;
  status: string;
  avatar: ImageSourcePropType;
  phone: string;
  email: string;
  units: ProfileUnit[];
};

export type SupportRequestCategory = "maintenance" | "noise";

export type SupportRequestUrgency = "urgent" | "medium";

export type SupportRequestReporter = {
  name: string;
  unit: string;
  avatar?: ImageSourcePropType;
};

export type AdminResponse = {
  message: string;
};

export type SupportRequest = {
  id: string;
  date: string;
  category: SupportRequestCategory;
  title: string;
  description: string;
  reporter: SupportRequestReporter;
  urgency: SupportRequestUrgency;
  adminResponse?: AdminResponse;
};
