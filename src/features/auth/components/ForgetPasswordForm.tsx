import {
  createForgetPasswordSchema,
  type ForgetPasswordFormValues,
} from "@/features/auth/schemas/forgetPasswordSchema";
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
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgetPasswordFormValues) => {
    // TODO: connect to auth API
    console.log("send reset link", values);

    router.push({
      pathname: "/reset-password",
      params: { email: values.email },
    });
  };

  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-[#1F1F1F]">
          {t("auth.forgetPassword.title")}
        </Text>
        <Text className="mt-1 text-sm text-[#90A1B9]" style={{ textAlign }}>
          {t("auth.forgetPassword.subtitle")}
        </Text>
      </View>

      <View className="mb-6 w-full">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="w-full">
              <Text className="mb-2 text-sm font-medium text-[#2E2E2E]">
                {t("auth.forgetPassword.email")}
              </Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={t("auth.forgetPassword.emailPlaceholder")}
                placeholderTextColor="#90A1B9"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className={`w-full rounded-xl border bg-white px-4 text-base text-[#1F1F1F] placeholder:ps-2 ${
                  errors.email ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
                }`}
                style={{
                  textAlign,
                  minHeight: 52,
                  paddingVertical: 14,
                }}
              />
              {errors.email ? (
                <Text
                  className="mt-2 text-sm text-[#EF4444]"
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
        className="w-full items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
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
