import type {
  CommunityDocument,
  DocumentCategory,
  DocumentCategoryFilter,
} from "@/features/documents/types";

export const DOCUMENT_CATEGORY_FILTERS: { id: DocumentCategoryFilter }[] = [
  { id: "all" },
  { id: "notices" },
  { id: "reports" },
  { id: "forms" },
  { id: "policies" },
];

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  "notices",
  "reports",
  "forms",
  "policies",
];

export const DUMMY_DOCUMENTS: CommunityDocument[] = [
  {
    id: "d1",
    title: "Community Guideliness",
    category: "reports",
    fileType: "pdf",
    size: "2.4 MB",
    date: "May 20, 2026",
  },
  {
    id: "d2",
    title: "Community Guideliness",
    category: "forms",
    fileType: "xls",
    size: "2.4 MB",
    date: "May 20, 2026",
  },
  {
    id: "d3",
    title: "Community Guideliness",
    category: "notices",
    fileType: "doc",
    size: "2.4 MB",
    date: "May 20, 2026",
  },
  {
    id: "d4",
    title: "Parking Policy",
    category: "policies",
    fileType: "pdf",
    size: "1.8 MB",
    date: "Apr 12, 2026",
  },
  {
    id: "d5",
    title: "Maintenance Notice",
    category: "notices",
    fileType: "pdf",
    size: "980 KB",
    date: "Mar 05, 2026",
  },
];

export function getDocumentById(
  documentId: string,
  documents: CommunityDocument[],
): CommunityDocument | undefined {
  return documents.find((document) => document.id === documentId);
}
