import {
  addRequestToState,
  deleteRequestFromState,
  getRequestFromState,
  getRequestsState,
  updateRequestInState,
} from "@/features/requests/store/requestState";
import type { ServiceRequest } from "@/features/requests/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getRequests(): Promise<ServiceRequest[]> {
  await mockDelay();
  return getRequestsState();
}

export async function getRequestById(
  requestId: string,
): Promise<ServiceRequest> {
  await mockDelay();

  const request = getRequestFromState(requestId);
  if (!request) {
    throw new MockApiError("Request not found", 404);
  }

  return request;
}

export async function createRequest(
  request: ServiceRequest,
): Promise<ServiceRequest> {
  await mockDelay();
  addRequestToState(request);
  return request;
}

export async function updateRequest(
  request: ServiceRequest,
): Promise<ServiceRequest> {
  await mockDelay();

  const existing = getRequestFromState(request.id);
  if (!existing) {
    throw new MockApiError("Request not found", 404);
  }

  updateRequestInState(request);
  return request;
}

export async function deleteRequest(requestId: string): Promise<void> {
  await mockDelay();

  const existing = getRequestFromState(requestId);
  if (!existing) {
    throw new MockApiError("Request not found", 404);
  }

  deleteRequestFromState(requestId);
}

export async function assignWorkers(
  requestId: string,
  workerIds: string[],
): Promise<ServiceRequest> {
  await mockDelay();

  const existing = getRequestFromState(requestId);
  if (!existing) {
    throw new MockApiError("Request not found", 404);
  }

  const updated: ServiceRequest = {
    ...existing,
    assignedWorkerIds: workerIds,
    status: workerIds.length > 0 ? "assigned" : existing.status,
  };

  updateRequestInState(updated);
  return updated;
}
