import type {
  Resident,
  ResidentFilterCriteria,
  ResidentRole,
} from "@/features/residents/types";

const dummyAvatar = require("@/features/home/constants/dummy-avatar.jpg");

export const RESIDENT_BUILDINGS = [
  "Build (A)",
  "Build (B)",
  "Build (C)",
  "Build (D)",
];

export const RESIDENT_UNITS = [
  "A-1",
  "A-7",
  "B-1",
  "B-3",
  "B-5",
  "C-2",
  "C-3",
  "D-4",
];

export const RESIDENT_ROLE_OPTIONS: { id: ResidentRole; label: string }[] = [
  { id: "owner", label: "Owner" },
  { id: "tenant", label: "Tenant" },
];

export const DEFAULT_INVITE_LINK =
  "https://communityapp.com/invite/a8f3k2m9x1";

export const INVITE_LINK_EXPIRES_AT = "18 May 2026, 9:41 AM";

export const DUMMY_RESIDENTS: Resident[] = [
  {
    id: "res-1",
    name: "Jade Smith",
    initials: "JS",
    role: "owner",
    unit: "B-3",
    building: "Build (B)",
    avatar: dummyAvatar,
    phone: "(555) 123-4567",
    email: "Johndoe@gmail.com",
    totalOutstanding: "2500.00 SAR",
    units: [
      { id: "u1", label: "B-1 · Build (B)" },
      { id: "u2", label: "C-3 · Build (C)" },
      { id: "u3", label: "B-3 · Build (B)" },
    ],
    paymentHistory: [
      {
        id: "ph-1",
        title: "Maintenance Fee",
        date: "May 01, 2026",
        amount: "1500 SAR",
        status: "paid",
      },
      {
        id: "ph-2",
        title: "Maintenance Fee",
        date: "Apr 01, 2026",
        amount: "1500 SAR",
        status: "overdue",
      },
    ],
  },
  {
    id: "res-2",
    name: "Alex Gargov",
    initials: "AG",
    role: "tenant",
    unit: "A-1",
    building: "Build (A)",
  },
  {
    id: "res-3",
    name: "Priya Sharma",
    initials: "PS",
    role: "owner",
    unit: "C-2",
    building: "Build (C)",
  },
  {
    id: "res-4",
    name: "Omar Essam",
    initials: "OE",
    role: "tenant",
    unit: "B-5",
    building: "Build (B)",
  },
  {
    id: "res-5",
    name: "Maya Khan",
    initials: "MK",
    role: "owner",
    unit: "D-4",
    building: "Build (D)",
  },
  {
    id: "res-6",
    name: "Liam Chen",
    initials: "LC",
    role: "tenant",
    unit: "A-7",
    building: "Build (A)",
  },
];

export const TOTAL_RESIDENTS_COUNT = 32;

export function getResidentById(residentId: string): Resident | undefined {
  return DUMMY_RESIDENTS.find((resident) => resident.id === residentId);
}

export function matchesResidentFilters(
  resident: Resident,
  criteria: ResidentFilterCriteria,
): boolean {
  if (criteria.building && resident.building !== criteria.building) {
    return false;
  }

  if (criteria.unit && resident.unit !== criteria.unit) {
    return false;
  }

  if (criteria.role && resident.role !== criteria.role) {
    return false;
  }

  return true;
}
