import { DUMMY_DOCUMENTS } from "@/features/documents/constants/dummy";
import type { DocumentFormValues } from "@/features/documents/schemas/documentSchema";
import type {
  CommunityDocument,
  DocumentCategory,
  SelectedDocumentFile,
} from "@/features/documents/types";
import { createMockId } from "@/utils/mockApi";

let documentsState: CommunityDocument[] = [...DUMMY_DOCUMENTS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getDocumentsState(): CommunityDocument[] {
  return documentsState;
}

export function getDocumentFromState(
  documentId: string,
): CommunityDocument | undefined {
  return documentsState.find((document) => document.id === documentId);
}

export function addDocumentToState(document: CommunityDocument): void {
  documentsState = [document, ...documentsState];
  notifyListeners();
}

export function updateDocumentInState(document: CommunityDocument): void {
  documentsState = documentsState.map((current) =>
    current.id === document.id ? document : current,
  );
  notifyListeners();
}

export function deleteDocumentFromState(documentId: string): void {
  documentsState = documentsState.filter(
    (document) => document.id !== documentId,
  );
  notifyListeners();
}

export function subscribeToDocuments(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetDocumentsState(): void {
  documentsState = [...DUMMY_DOCUMENTS];
  notifyListeners();
}

export function formatTodayDate(): string {
  const today = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

export function buildDocumentFromUpload(
  values: DocumentFormValues,
  file: SelectedDocumentFile,
): CommunityDocument {
  return {
    id: createMockId("d"),
    title: values.title,
    category: values.category as DocumentCategory,
    fileType: file.fileType,
    size: file.size,
    date: formatTodayDate(),
    fileUri: file.uri,
    mimeType: file.mimeType,
    fileName: file.name,
  };
}
