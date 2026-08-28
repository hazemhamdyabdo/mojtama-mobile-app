import {
  generateDeterministicInviteLink,
  getResidentFromState,
  getResidentsState,
  removeResidentFromState,
} from "@/features/residents/store/residentState";
import type { Resident } from "@/features/residents/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getResidents(): Promise<Resident[]> {
  await mockDelay();
  return getResidentsState();
}

export async function getResidentById(residentId: string): Promise<Resident> {
  await mockDelay();

  const resident = getResidentFromState(residentId);
  if (!resident) {
    throw new MockApiError("Resident not found", 404);
  }

  return resident;
}

export async function removeResident(residentId: string): Promise<void> {
  await mockDelay();

  const resident = getResidentFromState(residentId);
  if (!resident) {
    throw new MockApiError("Resident not found", 404);
  }

  removeResidentFromState(residentId);
}

export async function generateInvite(): Promise<{
  link: string;
  expiresAt: string;
}> {
  await mockDelay();
  return generateDeterministicInviteLink();
}
