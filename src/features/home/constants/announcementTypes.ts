export const ANNOUNCEMENT_TYPE_OPTIONS = [
  { id: "general" },
  { id: "maintenance" },
  { id: "security" },
  { id: "events" },
  { id: "billing" },
  { id: "other" },
] as const;

export type AnnouncementType =
  (typeof ANNOUNCEMENT_TYPE_OPTIONS)[number]["id"];

export const ANNOUNCEMENT_TYPE_VALUES = ANNOUNCEMENT_TYPE_OPTIONS.map(
  (option) => option.id,
) as [
  AnnouncementType,
  ...AnnouncementType[],
];
