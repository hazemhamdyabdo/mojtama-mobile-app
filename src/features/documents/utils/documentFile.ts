import type { DocumentFileType, SelectedDocumentFile } from "@/features/documents/types";
import * as DocumentPicker from "expo-document-picker";

export const MAX_DOCUMENT_FILE_SIZE_BYTES = 20 * 1024 * 1024;

const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
] as const;

export class DocumentFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocumentFileError";
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(bytes >= 100 * 1024 ? 0 : 1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function inferDocumentFileType(
  fileName: string,
  mimeType?: string | null,
): DocumentFileType {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  const normalizedMime = mimeType?.toLowerCase() ?? "";

  if (extension === "pdf" || normalizedMime.includes("pdf")) {
    return "pdf";
  }

  if (
    ["xls", "xlsx", "csv"].includes(extension) ||
    normalizedMime.includes("sheet") ||
    normalizedMime.includes("excel") ||
    normalizedMime.includes("csv")
  ) {
    return "xls";
  }

  if (
    ["doc", "docx"].includes(extension) ||
    normalizedMime.includes("word") ||
    normalizedMime.includes("document")
  ) {
    return "doc";
  }

  return "pdf";
}

export function getDefaultDocumentTitle(fileName: string): string {
  return fileName.replace(/\.[^/.]+$/, "").trim();
}

export async function pickDocumentFile(): Promise<SelectedDocumentFile | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: [...DOCUMENT_MIME_TYPES],
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled || !result.assets[0]) {
    return null;
  }

  const asset = result.assets[0];
  const sizeBytes = asset.size ?? 0;

  if (sizeBytes <= 0) {
    throw new DocumentFileError("Unable to read the selected file size.");
  }

  if (sizeBytes > MAX_DOCUMENT_FILE_SIZE_BYTES) {
    throw new DocumentFileError("File exceeds the 20 MB limit.");
  }

  return {
    name: asset.name,
    uri: asset.uri,
    size: formatFileSize(sizeBytes),
    sizeBytes,
    mimeType: asset.mimeType ?? undefined,
    fileType: inferDocumentFileType(asset.name, asset.mimeType),
  };
}
