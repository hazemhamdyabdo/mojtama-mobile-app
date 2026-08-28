import {
  addVisitorToState,
  buildVisitorFromForm,
  deleteVisitorFromState,
  getVisitorFromState,
  getVisitorsState,
  updateVisitorInState,
} from "@/features/visitors/store/visitorState";
import type { VisitorFormValues } from "@/features/visitors/schemas/visitorSchema";
import type { Visitor } from "@/features/visitors/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getVisitors(): Promise<Visitor[]> {
  await mockDelay();
  return getVisitorsState();
}

export async function getVisitorById(visitorId: string): Promise<Visitor> {
  await mockDelay();

  const visitor = getVisitorFromState(visitorId);
  if (!visitor) {
    throw new MockApiError("Visitor not found", 404);
  }

  return visitor;
}

export async function createVisitor(
  values: VisitorFormValues,
): Promise<Visitor> {
  await mockDelay();
  const visitor = buildVisitorFromForm(values);
  addVisitorToState(visitor);
  return visitor;
}

export async function updateVisitor(
  visitorId: string,
  values: VisitorFormValues,
): Promise<Visitor> {
  await mockDelay();

  const existing = getVisitorFromState(visitorId);
  if (!existing) {
    throw new MockApiError("Visitor not found", 404);
  }

  const updated = buildVisitorFromForm(values, existing);
  updateVisitorInState(updated);
  return updated;
}

export async function deleteVisitor(visitorId: string): Promise<void> {
  await mockDelay();

  const existing = getVisitorFromState(visitorId);
  if (!existing) {
    throw new MockApiError("Visitor not found", 404);
  }

  deleteVisitorFromState(visitorId);
}
