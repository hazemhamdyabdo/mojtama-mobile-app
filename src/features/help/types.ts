import type MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";

export type HelpTab = "emergency" | "faqs";

export type EmergencyContact = {
  id: string;
  title: string;
  subtitle: string;
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

export type HelpFaqCategory = {
  id: string;
  title: string;
  icon: HelpFaqCategoryIcon;
  questions: HelpFaqQuestion[];
};

export type HelpSupportContact = {
  id: string;
  label: string;
  value: string;
  icon: HelpFaqCategoryIcon;
  action: "phone" | "email" | "support";
};
