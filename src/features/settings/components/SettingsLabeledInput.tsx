import { colors } from "@/theme/colors";
import { Text, TextInput, View, type TextInputProps } from "react-native";

type SettingsLabeledInputProps = {
  label: string;
  error?: string;
  inputProps: TextInputProps;
};

export default function SettingsLabeledInput({
  label,
  error,
  inputProps,
}: SettingsLabeledInputProps) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-sm font-semibold text-heading">{label}</Text>
      <TextInput
        placeholderTextColor={colors.secText}
        className={`rounded-xl border bg-white px-4 py-3.5 text-base text-heading ${
          error ? "border-rejected-200" : "border-card-border"
        }`}
        {...inputProps}
      />
      {error ? (
        <Text className="mt-2 text-sm text-rejected">{error}</Text>
      ) : null}
    </View>
  );
}
