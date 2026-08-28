import type { TFunction } from "i18next";

/** Translate a static UI label by enum/id under a namespace prefix. */
export function translateLabel(t: TFunction, prefix: string, id: string): string {
  return t(`${prefix}.${id}`);
}

/** Map option ids to translated labels (filters, tabs, chips). */
export function translateOptions<T extends string>(
  t: TFunction,
  prefix: string,
  options: readonly { id: T }[],
): { id: T; label: string }[] {
  return options.map((option) => ({
    id: option.id,
    label: translateLabel(t, prefix, option.id),
  }));
}
