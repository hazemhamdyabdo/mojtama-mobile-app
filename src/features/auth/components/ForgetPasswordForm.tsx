import { colors } from "@/theme/colors";
import {
  createForgetPasswordSchema,
  type ForgetPasswordFormValues,
} from "@/features/auth/schemas/forgetPasswordSchema";
import { requestPasswordReset } from "@/features/auth/api";
import { MockApiError } from "@/utils/mockApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";

function ForgetPasswordFormFields() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const forgetPasswordSchema = useMemo(
    () => createForgetPasswordSchema(t),
    [t, i18n.language],
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgetPasswordFormValues) => {
    try {
      await requestPasswordReset({ email: values.email });
      router.push({
        pathname: "/reset-password",
        params: { email: values.email },
      });
    } catch (error) {
      const message =
        error instanceof MockApiError
          ? error.message
          : "Unable to send reset link. Please try again.";
      setError("email", { message });
    }
  };

  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-heading">
          {t("auth.forgetPassword.title")}
        </Text>
        <Text className="mt-1 text-sm text-sec-text" style={{ textAlign }}>
          {t("auth.forgetPassword.subtitle")}
        </Text>
      </View>

      <View className="mb-6 w-full">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full">
              <Text className="mb-2 text-sm font-medium text-label">
                {t("auth.forgetPassword.email")}
              </Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("auth.forgetPassword.emailPlaceholder")}
                placeholderTextColor={colors.secText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className={`w-full rounded-xl border bg-white px-4 text-base text-heading placeholder:ps-2 ${
                  errors.email ? "border-rejected-200" : "border-card-border"
                }`}
                style={{
                  textAlign,
                  minHeight: 52,
                  paddingVertical: 14,
                }}
              />
              {errors.email ? (
                <Text
                  className="mt-2 text-sm text-rejected"
                  style={{ textAlign }}
                >
                  {errors.email.message}
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="w-full items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.forgetPassword.sendResetLink")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function ForgetPasswordForm() {
  const { i18n } = useTranslation();
  return <ForgetPasswordFormFields key={i18n.language} />;
}
