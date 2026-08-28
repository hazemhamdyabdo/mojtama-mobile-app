import type { TFunction } from "i18next";

export const VISIBILITY_VALUES = [
  "all-members",
  "residents",
  "managers",
] as const;

export type VisibilityOption = (typeof VISIBILITY_VALUES)[number];

export const VISIBILITY_OPTIONS: { id: VisibilityOption }[] = [
  { id: "all-members" },
  { id: "residents" },
  { id: "managers" },
];

const VISIBILITY_LABEL_KEYS: Record<VisibilityOption, string> = {
  "all-members": "allMembers",
  residents: "residentsOnly",
  managers: "managersOnly",
};

export function getVisibilityLabel(t: TFunction, id: VisibilityOption): string {
  return t(`home.visibility.${VISIBILITY_LABEL_KEYS[id]}`);
}
