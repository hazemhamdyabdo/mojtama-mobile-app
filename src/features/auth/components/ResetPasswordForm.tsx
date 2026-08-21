import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/resetPasswordSchema";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  visible: boolean;
  onToggleVisible: () => void;
};

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  visible,
  onToggleVisible,
}: PasswordFieldProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const iconPosition = I18nManager.isRTL ? "left" : "right";

  return (
    <View className="w-full">
      <Text className="mb-2 text-sm font-medium text-[#2E2E2E]">{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#90A1B9"
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            { textAlign },
            iconPosition === "right"
              ? styles.inputPaddingEnd
              : styles.inputPaddingStart,
            error ? styles.inputError : styles.inputDefault,
          ]}
        />
        <Pressable
          onPress={onToggleVisible}
          style={[
            styles.visibilityToggle,
            iconPosition === "right" ? styles.toggleEnd : styles.toggleStart,
          ]}
          hitSlop={8}
        >
          <MaterialDesignIcons
            name={visible ? "eye" : "eye-off"}
            size={20}
            color="#90A1B9"
          />
        </Pressable>
      </View>
      {error ? (
        <Text className="mt-2 text-sm text-[#EF4444]" style={{ textAlign }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

function ResetPasswordFormFields() {
  const { t, i18n } = useTranslation();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const resetPasswordSchema = useMemo(
    () => createResetPasswordSchema(t),
    [t, i18n.language],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    // TODO: connect to auth API
    console.log("reset password", { email, ...values });
  };

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-[#1F1F1F]">
          {t("auth.resetPassword.title")}
        </Text>
      </View>

      <View className="mb-5 w-full">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              label={t("auth.resetPassword.password")}
              placeholder={t("auth.resetPassword.passwordPlaceholder")}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              visible={passwordVisible}
              onToggleVisible={() => setPasswordVisible((current) => !current)}
            />
          )}
        />
      </View>

      <View className="mb-6 w-full">
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              label={t("auth.resetPassword.confirmPassword")}
              placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              visible={confirmPasswordVisible}
              onToggleVisible={() =>
                setConfirmPasswordVisible((current) => !current)
              }
            />
          )}
        />
      </View>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="w-full items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.resetPassword.resetButton")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function ResetPasswordForm() {
  const { i18n } = useTranslation();
  return <ResetPasswordFormFields key={i18n.language} />;
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#1F1F1F",
  },
  inputDefault: {
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  inputPaddingEnd: {
    paddingRight: 48,
  },
  inputPaddingStart: {
    paddingLeft: 48,
  },
  visibilityToggle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 44,
  },
  toggleEnd: {
    right: 4,
  },
  toggleStart: {
    left: 4,
  },
});
