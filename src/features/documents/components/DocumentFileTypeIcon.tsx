import type { DocumentFileType } from "@/features/documents/types";
import { Text, View } from "react-native";

type DocumentFileTypeIconProps = {
  fileType: DocumentFileType;
  size?: "sm" | "md";
};

function getFileTypeStyles(fileType: DocumentFileType) {
  switch (fileType) {
    case "pdf":
      return { container: "bg-[#FEE2E2]", text: "text-[#EF4444]", label: "PDF" };
    case "xls":
      return { container: "bg-[#DCFCE7]", text: "text-[#16A34A]", label: "XLS" };
    case "doc":
      return { container: "bg-[#DBEAFE]", text: "text-[#2563EB]", label: "DOC" };
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
