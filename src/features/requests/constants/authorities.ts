import { colors } from "@/theme/colors";

export const AUTHORITY_CONTACTS = [
  {
    id: "fire",
    label: "Fire Emergency",
    phone: "911",
    icon: "fire" as const,
    iconColor: colors.rejected,
    iconBackground: "bg-rejected-50",
  },
  {
    id: "water-damage",
    label: "Water Damage",
    phone: "911",
    icon: "water" as const,
    iconColor: colors.primary700,
    iconBackground: "bg-primary-50",
  },
  {
    id: "medical",
    label: "Medical Emergency",
    phone: "911",
    icon: "hospital-box-outline" as const,
    iconColor: colors.approved700,
    iconBackground: "bg-approved-50",
  },
  {
    id: "security-threat",
    label: "Security threat",
    phone: "911",
    icon: "shield-star-outline" as const,
    iconColor: colors.pending600,
    iconBackground: "bg-pending-100",
  },
  {
    id: "electrical",
    label: "Electrical Emerency",
    phone: "911",
    icon: "lightbulb-outline" as const,
    iconColor: colors.pending,
    iconBackground: "bg-pending-50",
  },
];
