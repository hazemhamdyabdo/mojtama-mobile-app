import type MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import type { ComponentProps } from "react";

export type ServiceRole = "admin" | "resident";

export type ServiceIconName = ComponentProps<
  typeof MaterialDesignIcons
>["name"];

export type CommunityOverviewMetric = {
  id: string;
  label: string;
  value: number;
  icon: ServiceIconName;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName | "sos";
};
