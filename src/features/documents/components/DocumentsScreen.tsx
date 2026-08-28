import DocumentActionsBottomSheet, {
  type DocumentActionsBottomSheetRef,
} from "@/features/documents/components/DocumentActionsBottomSheet";
import DocumentCard from "@/features/documents/components/DocumentCard";
import DocumentCategoryChips from "@/features/documents/components/DocumentCategoryChips";
import DocumentsHeader from "@/features/documents/components/DocumentsHeader";
import DocumentsSearchBar from "@/features/documents/components/DocumentsSearchBar";
import EditDocumentBottomSheet, {
  type EditDocumentBottomSheetRef,
} from "@/features/documents/components/EditDocumentBottomSheet";
import UploadDocumentBottomSheet, {
  type UploadDocumentBottomSheetRef,
} from "@/features/documents/components/UploadDocumentBottomSheet";
import { DUMMY_DOCUMENTS } from "@/features/documents/constants/dummy";
import type { DocumentFormValues } from "@/features/documents/schemas/documentSchema";
import type {
  CommunityDocument,
  DocumentCategory,
  DocumentCategoryFilter,
  SelectedDocumentFile,
} from "@/features/documents/types";
import {
  DocumentActionError,
  downloadDocumentFile,
  viewDocumentFile,
} from "@/features/documents/utils/documentActions";
import HelpStillNeedHelpCard from "@/features/help/components/HelpStillNeedHelpCard";
import { styled } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function formatTodayDate(): string {
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

export default function DocumentsScreen() {
  const uploadSheetRef = useRef<UploadDocumentBottomSheetRef>(null);
  const actionsSheetRef = useRef<DocumentActionsBottomSheetRef>(null);
  const editSheetRef = useRef<EditDocumentBottomSheetRef>(null);

  const [documents, setDocuments] =
    useState<CommunityDocument[]>(DUMMY_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<DocumentCategoryFilter>("all");

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesCategory =
        selectedCategory === "all" || document.category === selectedCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        document.title.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [documents, searchQuery, selectedCategory]);

  const handleUpload = (
    values: DocumentFormValues,
    file: SelectedDocumentFile,
  ) => {
    const newDocument: CommunityDocument = {
      id: `d-${Date.now()}`,
      title: values.title,
      category: values.category as DocumentCategory,
      fileType: file.fileType,
      size: file.size,
      date: formatTodayDate(),
      fileUri: file.uri,
      mimeType: file.mimeType,
      fileName: file.name,
    };

    setDocuments((current) => [newDocument, ...current]);
  };

  const getDocumentById = useCallback(
    (documentId: string) =>
      documents.find((document) => document.id === documentId),
    [documents],
  );

  const handleDocumentAction = useCallback(
    async (
      documentId: string,
      action: (document: CommunityDocument) => Promise<void>,
    ) => {
      const document = getDocumentById(documentId);

      if (!document) {
        return;
      }

      try {
        await action(document);
      } catch (error) {
        const message =
          error instanceof DocumentActionError
            ? error.message
            : "Something went wrong. Please try again.";

        Alert.alert("Document action failed", message);
        console.warn("Document action failed", error);
      }
    },
    [getDocumentById],
  );

  const handleUpdate = (documentId: string, values: DocumentFormValues) => {
    setDocuments((current) =>
      current.map((document) =>
        document.id === documentId
          ? {
              ...document,
              title: values.title,
              category: values.category as DocumentCategory,
            }
          : document,
      ),
    );
  };

  const handleDelete = (documentId: string) => {
    setDocuments((current) =>
      current.filter((document) => document.id !== documentId),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <DocumentsHeader onUploadPress={() => uploadSheetRef.current?.open()} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <DocumentsSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Text className="mb-3 text-base font-bold text-heading">
            Categories
          </Text>
          <DocumentCategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <Text className="mb-3 text-base font-bold text-heading">
            Recent Documents
          </Text>

          {filteredDocuments.length === 0 ? (
            <View className="items-center py-10">
              <Text className="text-base font-medium text-heading">
                No Documents Found
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                Try adjusting your search or category filter.
              </Text>
            </View>
          ) : (
            filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onDownloadPress={(documentId) =>
                  void handleDocumentAction(documentId, downloadDocumentFile)
                }
                onMenuPress={(selectedDocument) =>
                  actionsSheetRef.current?.open(selectedDocument)
                }
              />
            ))
          )}

          <HelpStillNeedHelpCard />
        </ScrollView>
      </View>

      <UploadDocumentBottomSheet ref={uploadSheetRef} onUpload={handleUpload} />

      <DocumentActionsBottomSheet
        ref={actionsSheetRef}
        onView={(documentId) =>
          void handleDocumentAction(documentId, viewDocumentFile)
        }
        onDownload={(documentId) =>
          void handleDocumentAction(documentId, downloadDocumentFile)
        }
        onEdit={(document) => editSheetRef.current?.open(document)}
        onDelete={handleDelete}
      />

      <EditDocumentBottomSheet ref={editSheetRef} onUpdate={handleUpdate} />
    </SafeAreaView>
  );
}
