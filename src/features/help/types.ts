import type MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";

export type HelpTab = "emergency" | "faqs";

export type EmergencyContactId = "police" | "ambulance" | "fire";

export type EmergencyContact = {
  id: EmergencyContactId;
  phoneNumber: string;
  icon: "shield-star-outline" | "ambulance" | "fire";
};

export type HelpFaqQuestion = {
  id: string;
  question: string;
  answer: string;
};

export type HelpFaqCategoryIcon = ComponentProps<
  typeof MaterialDesignIcons
>["name"];

export type HelpFaqCategoryId =
  | "maintenance-repairs"
  | "payments-billing"
  | "emergencies"
  | "community-rules"
  | "app-communication";

export type HelpFaqCategory = {
  id: HelpFaqCategoryId;
  icon: HelpFaqCategoryIcon;
  questions: HelpFaqQuestion[];
};

export type HelpSupportContactId = "phone" | "email" | "support";

export type HelpSupportContact = {
  id: HelpSupportContactId;
  value: string;
  icon: HelpFaqCategoryIcon;
  action: "phone" | "email" | "support";
};
