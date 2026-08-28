import { colors } from "@/theme/colors";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-heading">
        {label}
        {required ? <Text className="text-rejected">*</Text> : null}
        {optionalHint ? (
          <Text className="text-xs font-normal text-sec-text">
            {" "}
            {t("visitors.form.optional")}
          </Text>
        ) : null}
      </Text>
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
