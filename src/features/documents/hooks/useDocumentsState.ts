import { useEffect, useState } from "react";
import {
  getDocumentsState,
  subscribeToDocuments,
} from "@/features/documents/store/documentState";

export function useDocumentsState() {
  const [documents, setDocuments] = useState(getDocumentsState());

  useEffect(() => {
    return subscribeToDocuments(() => {
      setDocuments(getDocumentsState());
    });
  }, []);

  return documents;
}
