import {
  addDocumentToState,
  buildDocumentFromUpload,
  deleteDocumentFromState,
  getDocumentFromState,
  getDocumentsState,
  updateDocumentInState,
} from "@/features/documents/store/documentState";
import type { DocumentFormValues } from "@/features/documents/schemas/documentSchema";
import type {
  CommunityDocument,
  DocumentCategory,
  SelectedDocumentFile,
} from "@/features/documents/types";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getDocuments(): Promise<CommunityDocument[]> {
  await mockDelay();
  return getDocumentsState();
}

export async function uploadDocument(
  values: DocumentFormValues,
  file: SelectedDocumentFile,
): Promise<CommunityDocument> {
  await mockDelay();
  const document = buildDocumentFromUpload(values, file);
  addDocumentToState(document);
  return document;
}

export async function updateDocument(
  documentId: string,
  values: DocumentFormValues,
): Promise<CommunityDocument> {
  await mockDelay();

  const existing = getDocumentFromState(documentId);
  if (!existing) {
    throw new MockApiError("Document not found", 404);
  }

  const updated: CommunityDocument = {
    ...existing,
    title: values.title,
    category: values.category as DocumentCategory,
  };

  updateDocumentInState(updated);
  return updated;
}

export async function deleteDocument(documentId: string): Promise<void> {
  await mockDelay();

  const existing = getDocumentFromState(documentId);
  if (!existing) {
    throw new MockApiError("Document not found", 404);
  }

  deleteDocumentFromState(documentId);
}
