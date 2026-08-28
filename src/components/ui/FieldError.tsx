import { Text } from "react-native";

type FieldErrorProps = {
  message?: string;
};

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return <Text className="mt-2 text-sm text-rejected">{message}</Text>;
}
