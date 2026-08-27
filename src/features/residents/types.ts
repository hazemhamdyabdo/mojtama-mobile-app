import type { ImageSourcePropType } from "react-native";

export type ResidentRole = "owner" | "tenant";

export type ResidentUnit = {
  id: string;
  label: string;
};

export type ResidentPaymentStatus = "paid" | "overdue";

export type ResidentPaymentHistoryItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: ResidentPaymentStatus;
};

export type Resident = {
  id: string;
  name: string;
  initials: string;
  role: ResidentRole;
  unit: string;
  building: string;
  avatar?: ImageSourcePropType;
  units?: ResidentUnit[];
  phone?: string;
  email?: string;
  totalOutstanding?: string;
  paymentHistory?: ResidentPaymentHistoryItem[];
};

export type ResidentFilterCriteria = {
  building: string;
  unit: string;
  role: ResidentRole | "";
};

export const EMPTY_RESIDENT_FILTER: ResidentFilterCriteria = {
  building: "",
  unit: "",
  role: "",
};
