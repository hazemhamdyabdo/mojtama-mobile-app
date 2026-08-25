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
  { id: "profile", label: "Profile", icon: "account-outline" },
  { id: "update-name", label: "Update Name", icon: "pencil-outline" },
  { id: "update-email", label: "Update Email", icon: "email-outline" },
  { id: "update-phone", label: "Update Phone", icon: "phone-sync-outline" },
];

export const APP_SETTINGS_ITEMS: SettingsRowItem[] = [
  { id: "notifications", label: "Notifications", icon: "bell-outline" },
  { id: "language", label: "Language", icon: "translate" },
];

export const ABOUT_SETTINGS_ITEMS: SettingsRowItem[] = [
  { id: "privacy", label: "Privacy", icon: "shield-lock-outline" },
  { id: "help", label: "Help", icon: "help-circle-outline" },
];

export const APP_VERSION = "8.2.5";
export const APP_BUILD = "623844";
