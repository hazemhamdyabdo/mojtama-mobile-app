import { DUMMY_REQUESTS } from "@/features/requests/constants/dummy";
import type { ServiceRequest } from "@/features/requests/types";

let requestsState: ServiceRequest[] = [...DUMMY_REQUESTS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getRequestsState(): ServiceRequest[] {
  return requestsState;
}

export function getRequestFromState(
  requestId: string,
): ServiceRequest | undefined {
  return requestsState.find((request) => request.id === requestId);
}

export function addRequestToState(request: ServiceRequest): void {
  requestsState = [request, ...requestsState];
  notifyListeners();
}

export function updateRequestInState(request: ServiceRequest): void {
  requestsState = requestsState.map((current) =>
    current.id === request.id ? request : current,
  );
  notifyListeners();
}

export function deleteRequestFromState(requestId: string): void {
  requestsState = requestsState.filter((request) => request.id !== requestId);
  notifyListeners();
}

export function subscribeToRequests(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetRequestsState(): void {
  requestsState = [...DUMMY_REQUESTS];
  notifyListeners();
}
