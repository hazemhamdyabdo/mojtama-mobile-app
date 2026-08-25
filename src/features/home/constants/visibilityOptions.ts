export const VISIBILITY_VALUES = [
  "all-members",
  "residents",
  "managers",
] as const;

export type VisibilityOption = (typeof VISIBILITY_VALUES)[number];

export const VISIBILITY_OPTIONS: {
  id: VisibilityOption;
  label: string;
}[] = [
  { id: "all-members", label: "All Members" },
  { id: "residents", label: "Residents Only" },
  { id: "managers", label: "Managers Only" },
];

export function getVisibilityLabel(id: VisibilityOption) {
  return (
    VISIBILITY_OPTIONS.find((option) => option.id === id)?.label ?? "All Members"
  );
}
