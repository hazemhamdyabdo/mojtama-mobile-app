import type { DocumentFileType } from "@/features/documents/types";
import { Text, View } from "react-native";

type DocumentFileTypeIconProps = {
  fileType: DocumentFileType;
  size?: "sm" | "md";
};

function getFileTypeStyles(fileType: DocumentFileType) {
  switch (fileType) {
    case "pdf":
      return { container: "bg-rejected-50", text: "text-rejected", label: "PDF" };
    case "xls":
      return { container: "bg-approved-50", text: "text-approved-700", label: "XLS" };
    case "doc":
      return { container: "bg-primary-50", text: "text-primary-700", label: "DOC" };
    default: {
      const exhaustive: never = fileType;
      return exhaustive;
    }
  }
}

export default function DocumentFileTypeIcon({
  fileType,
  size = "md",
}: DocumentFileTypeIconProps) {
  const styles = getFileTypeStyles(fileType);
  const dimensions = size === "sm" ? "size-10" : "size-12";

  return (
    <View
      className={`${dimensions} items-center justify-center rounded-xl ${styles.container}`}
    >
      <Text className={`text-xs font-bold ${styles.text}`}>{styles.label}</Text>
    </View>
  );
}
