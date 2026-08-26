import type { CommunityDocument } from "@/features/documents/types";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";

export class DocumentActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocumentActionError";
  }
}

function getDocumentUri(document: CommunityDocument): string {
  if (!document.fileUri) {
    throw new DocumentActionError(
      "This document does not have an uploaded file yet.",
    );
  }

  return document.fileUri;
}

export async function viewDocumentFile(
  document: CommunityDocument,
): Promise<void> {
  const uri = getDocumentUri(document);
  const canOpen = await Linking.canOpenURL(uri);

  if (!canOpen) {
    throw new DocumentActionError("Unable to open this document on your device.");
  }

  await Linking.openURL(uri);
}

export async function downloadDocumentFile(
  document: CommunityDocument,
): Promise<void> {
  const uri = getDocumentUri(document);
  const canShare = await Sharing.isAvailableAsync();

  if (!canShare) {
    throw new DocumentActionError("Download is not available on this device.");
  }

  await Sharing.shareAsync(uri, {
    mimeType: document.mimeType,
    dialogTitle: `Download ${document.title}`,
  });
}
