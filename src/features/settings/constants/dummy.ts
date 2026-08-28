import type { SettingsProfile, SettingsRowItem } from "@/features/settings/types";

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

export const SETTINGS_PROFILE: SettingsProfile = {
  name: "Omar Essam",
  status: "Active",
  avatar: dummyAvatar,
  units: [
    { id: "1", label: "B-1 · Build (B)" },
    { id: "2", label: "C-3 · Build (C)" },
    { id: "3", label: "B-1 · Build (B)" },
    { id: "4", label: "C-3 · Build (C)" },
  ],
};

export const PROFILE_SETTINGS_ITEMS: SettingsRowItem[] = [
  { id: "profile", icon: "account-outline" },
  { id: "update-name", icon: "pencil-outline" },
  { id: "update-email", icon: "email-outline" },
  { id: "update-phone", icon: "phone-sync-outline" },
];

export const APP_SETTINGS_ITEMS: SettingsRowItem[] = [
  { id: "notifications", icon: "bell-outline" },
  { id: "language", icon: "translate" },
];

export const ABOUT_SETTINGS_ITEMS: SettingsRowItem[] = [
  { id: "privacy", icon: "shield-lock-outline" },
  { id: "help", icon: "help-circle-outline" },
];

export const APP_VERSION = "8.2.5";
export const APP_BUILD = "623844";
