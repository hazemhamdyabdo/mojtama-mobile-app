export const ANNOUNCEMENT_TYPE_OPTIONS = [
  { id: "general", label: "General" },
  { id: "maintenance", label: "Maintenance" },
  { id: "security", label: "Security" },
  { id: "events", label: "Events" },
  { id: "billing", label: "Billing" },
  { id: "other", label: "Other" },
] as const;

export type AnnouncementType =
  (typeof ANNOUNCEMENT_TYPE_OPTIONS)[number]["id"];

export const ANNOUNCEMENT_TYPE_VALUES = ANNOUNCEMENT_TYPE_OPTIONS.map(
  (option) => option.id,
) as [
  AnnouncementType,
  ...AnnouncementType[],
];
