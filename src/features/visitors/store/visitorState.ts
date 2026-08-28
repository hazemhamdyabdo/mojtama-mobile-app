import { DUMMY_VISITORS } from "@/features/visitors/constants/dummy";
import type { Visitor } from "@/features/visitors/types";
import type { VisitorFormValues } from "@/features/visitors/schemas/visitorSchema";
import { createMockId } from "@/utils/mockApi";

let visitorsState: Visitor[] = [...DUMMY_VISITORS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getVisitorsState(): Visitor[] {
  return visitorsState;
}

export function getVisitorFromState(visitorId: string): Visitor | undefined {
  return visitorsState.find((visitor) => visitor.id === visitorId);
}

export function addVisitorToState(visitor: Visitor): void {
  visitorsState = [visitor, ...visitorsState];
  notifyListeners();
}

export function updateVisitorInState(visitor: Visitor): void {
  visitorsState = visitorsState.map((current) =>
    current.id === visitor.id ? visitor : current,
  );
  notifyListeners();
}

export function deleteVisitorFromState(visitorId: string): void {
  visitorsState = visitorsState.filter((visitor) => visitor.id !== visitorId);
  notifyListeners();
}

export function subscribeToVisitors(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetVisitorsState(): void {
  visitorsState = [...DUMMY_VISITORS];
  notifyListeners();
}

export function buildVisitorFromForm(
  values: VisitorFormValues,
  existing?: Visitor,
): Visitor {
  const id = existing?.id ?? createMockId("v");

  return {
    id,
    name: values.name,
    hostName: existing?.hostName ?? "Jade Smith",
    location: values.unit,
    building: values.building,
    unit: values.unit,
    gate: values.gate,
    parkingSpot: values.parkingSpot,
    date: values.date,
    time: values.time,
    purpose: values.purpose,
    status: existing?.status ?? "pending",
    duration: existing?.duration ?? "Full day",
    phone: values.phone,
    email: values.email || undefined,
    accessCode: existing?.accessCode,
    expiryDate: existing?.expiryDate,
    timeline: existing?.timeline ?? [
      {
        id: `t-${Date.now()}`,
        title: "Request Submitted",
        timestamp: `${values.date}  at  ${values.time}`,
      },
    ],
  };
}
