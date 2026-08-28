import { DUMMY_RESIDENTS } from "@/features/residents/constants/dummy";
import type { Resident } from "@/features/residents/types";

let residentsState: Resident[] = [...DUMMY_RESIDENTS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getResidentsState(): Resident[] {
  return residentsState;
}

export function getResidentFromState(
  residentId: string,
): Resident | undefined {
  return residentsState.find((resident) => resident.id === residentId);
}

export function removeResidentFromState(residentId: string): void {
  residentsState = residentsState.filter(
    (resident) => resident.id !== residentId,
  );
  notifyListeners();
}

export function subscribeToResidents(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetResidentsState(): void {
  residentsState = [...DUMMY_RESIDENTS];
  notifyListeners();
}

export function generateDeterministicInviteLink(): {
  link: string;
  expiresAt: string;
} {
  const suffix = "testflight-demo";
  return {
    link: `https://mojtama.app/invite/${suffix}`,
    expiresAt: "Dec 31, 2026",
  };
}
