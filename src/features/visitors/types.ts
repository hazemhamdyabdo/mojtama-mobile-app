export type VisitorsTab = "upcoming" | "previous";

export type VisitorStatus = "approved" | "pending" | "complete";

export type VisitorTimelineEvent = {
  id: string;
  title: string;
  timestamp: string;
};

export type Visitor = {
  id: string;
  name: string;
  hostName: string;
  location: string;
  building: string;
  unit: string;
  gate: string;
  parkingSpot: string;
  date: string;
  time: string;
  purpose: string;
  status: VisitorStatus;
  duration: string;
  phone: string;
  email?: string;
  accessCode?: string;
  expiryDate?: string;
  timeline: VisitorTimelineEvent[];
};
