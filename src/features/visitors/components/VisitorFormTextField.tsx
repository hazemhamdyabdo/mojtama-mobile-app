import { Text, TextInput, View, type TextInputProps } from "react-native";

type VisitorFormTextFieldProps = {
  label: string;
  required?: boolean;
  optionalHint?: boolean;
  error?: string;
  inputProps: TextInputProps;
};

export default function VisitorFormTextField({
  label,
  required = false,
  optionalHint = false,
  error,
  inputProps,
}: VisitorFormTextFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
        {label}
        {required ? <Text className="text-[#EF4444]">*</Text> : null}
        {optionalHint ? (
          <Text className="text-xs font-normal text-[#90A1B9]"> (optional)</Text>
        ) : null}
      </Text>
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
