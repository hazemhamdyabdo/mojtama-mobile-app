import type { SupportRequest, UserProfile } from "@/features/profile/types";

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

export const PROFILE_USER: UserProfile = {
  name: "Omar Essam",
  status: "Active",
  avatar: dummyAvatar,
  phone: "(555) 123-4567",
  email: "Johndoe@gmail.com",
  units: [
    { id: "1", label: "B-1 · Build (B)" },
    { id: "2", label: "C-3 · Build (C)" },
    { id: "3", label: "B-3 · Build (B)" },
    { id: "4", label: "A-3 · Build (A)" },
  ],
};

export const SUPPORT_REQUESTS: SupportRequest[] = [
  {
    id: "1",
    date: "Oct 24, 2025",
    category: "maintenance",
    title: "Elevator malfunction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    reporter: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    urgency: "urgent",
    adminResponse: {
      message:
        "Elevator has been repaired and tested. New safety sensors installed. Issue resolved.",
    },
  },
  {
    id: "2",
    date: "Oct 24, 2025",
    category: "noise",
    title: "Elevator malfunction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    reporter: {
      name: "Jade Smith",
      unit: "5A/B",
      avatar: dummyAvatar,
    },
    urgency: "medium",
  },
];

export const PROFILE_TABS = [
  { id: "support-requests" as const, label: "Support requests" },
  { id: "payments" as const, label: "Payments" },
  { id: "visitations" as const, label: "Visitations" },
];
