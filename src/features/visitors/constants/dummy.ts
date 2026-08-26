import type { Visitor, VisitorsTab } from "@/features/visitors/types";

export const VISITORS_TABS: { id: VisitorsTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "previous", label: "Previous" },
];

export const VISITOR_BUILDINGS = ["A", "B", "C"];
export const VISITOR_UNITS = ["5A/B", "3C", "B-1", "C-3"];
export const VISITOR_GATES = ["Main Gate", "North Gate", "South Gate"];
export const VISITOR_PARKING_SPOTS = [
  "Main Parking",
  "A25",
  "B10",
  "Visitor Parking",
];
export const VISITOR_PURPOSES = [
  "Family visit",
  "Maintenance Work",
  "Delivery",
  "Business Meeting",
];

export const DUMMY_VISITORS: Visitor[] = [
  {
    id: "v1",
    name: "Mohamed Ragab",
    hostName: "Jade Smith",
    location: "5A/B",
    building: "B",
    unit: "5A/B",
    gate: "Main Gate",
    parkingSpot: "A25",
    date: "Oct 24, 2025",
    time: "4:30PM",
    purpose: "Maintenance Work",
    status: "approved",
    duration: "Full day",
    phone: "(555) 123-4567",
    email: "Johndoe@gmail.com",
    accessCode: "4567",
    expiryDate: "25-7-2025, 12:30",
    timeline: [
      {
        id: "t1",
        title: "Checked-Out",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
      {
        id: "t2",
        title: "Checked-In",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
      {
        id: "t3",
        title: "Approved By Alex Garov",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
    ],
  },
  {
    id: "v2",
    name: "Mohamed Ragab",
    hostName: "Jade Smith",
    location: "5A/B",
    building: "B",
    unit: "5A/B",
    gate: "Main Gate",
    parkingSpot: "Main Parking",
    date: "Oct 24, 2025",
    time: "4:30PM",
    purpose: "Maintenance Work",
    status: "pending",
    duration: "Full day",
    phone: "(555) 123-4567",
    email: "Johndoe@gmail.com",
    timeline: [
      {
        id: "t1",
        title: "Request Submitted",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
    ],
  },
  {
    id: "v3",
    name: "Omar Mohamed",
    hostName: "Jade Smith",
    location: "5A/B",
    building: "B",
    unit: "5A/B",
    gate: "Main Gate",
    parkingSpot: "A25",
    date: "Oct 24, 2025",
    time: "4:30PM",
    purpose: "Family Visit",
    status: "complete",
    duration: "Full day",
    phone: "(555) 123-4567",
    email: "Johndoe@gmail.com",
    timeline: [
      {
        id: "t1",
        title: "Checked-Out",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
      {
        id: "t2",
        title: "Checked-In",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
    ],
  },
  {
    id: "v4",
    name: "Ahmed Essam",
    hostName: "Jade Smith",
    location: "5A/B",
    building: "B",
    unit: "5A/B",
    gate: "North Gate",
    parkingSpot: "B10",
    date: "Oct 24, 2025",
    time: "4:30PM",
    purpose: "Delivery",
    status: "complete",
    duration: "Full day",
    phone: "(555) 123-4567",
    timeline: [
      {
        id: "t1",
        title: "Checked-Out",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
      {
        id: "t2",
        title: "Checked-In",
        timestamp: "Oct 24, 2025  at  4:30PM",
      },
    ],
  },
];

export function getVisitorById(visitorId: string): Visitor | undefined {
  return DUMMY_VISITORS.find((visitor) => visitor.id === visitorId);
}
