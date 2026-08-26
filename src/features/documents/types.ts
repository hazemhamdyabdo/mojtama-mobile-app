export type DocumentCategoryFilter =
  | "all"
  | "notices"
  | "reports"
  | "forms"
  | "policies";

export type DocumentCategory = Exclude<DocumentCategoryFilter, "all">;

export type DocumentFileType = "pdf" | "xls" | "doc";

export type CommunityDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  fileType: DocumentFileType;
  size: string;
  date: string;
  fileUri?: string;
  mimeType?: string;
  fileName?: string;
};

export type SelectedDocumentFile = {
  name: string;
  uri: string;
  size: string;
  sizeBytes: number;
  fileType: DocumentFileType;
  mimeType?: string;
};
