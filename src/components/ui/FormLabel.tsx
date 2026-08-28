import { Text } from "react-native";

type FormLabelProps = {
  label: string;
  required?: boolean;
  className?: string;
};

export default function FormLabel({
  label,
  required = false,
  className = "",
}: FormLabelProps) {
  return (
    <Text className={`mb-2 text-sm font-medium text-label ${className}`}>
      {label}
      {required ? <Text className="text-rejected">*</Text> : null}
    </Text>
  );
}
