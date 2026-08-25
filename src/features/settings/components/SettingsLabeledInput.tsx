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
      <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">{label}</Text>
      <TextInput
        placeholderTextColor="#90A1B9"
        className={`rounded-xl border bg-white px-4 py-3.5 text-base text-[#1F1F1F] ${
          error ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
        }`}
        {...inputProps}
      />
      {error ? (
        <Text className="mt-2 text-sm text-[#EF4444]">{error}</Text>
      ) : null}
    </View>
  );
}
