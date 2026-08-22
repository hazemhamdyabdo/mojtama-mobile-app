import {
  createLoginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, Text, TextInput, View } from "react-native";

type AuthTextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "default";
};

function AuthTextField({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  secureTextEntry = false,
  keyboardType = "default",
}: AuthTextFieldProps) {
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="w-full">
      <Text className="mb-2 text-sm font-medium text-[#2E2E2E]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#90A1B9"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        className={`w-full rounded-xl border bg-white px-4 text-base text-[#1F1F1F] placeholder:ps-4 ${
          error ? "border-[#FCA5A5]" : "border-[#E4E4E7]"
        }`}
        style={{
          textAlign,
          minHeight: 52,
          paddingVertical: 14,
        }}
      />
      {error ? (
        <Text className="mt-2 text-sm text-[#EF4444]" style={{ textAlign }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

function LoginFormFields() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const loginSchema = useMemo(() => createLoginSchema(t), [t, i18n.language]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "hazem.hamdy@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    // TODO: connect to auth API
    console.log("login", values);
    router.push("/(tabs)" as Href);
  };

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-[#1F1F1F]">
          {t("auth.loginForm.welcomeBack")}
        </Text>
        <Text className="mt-1 text-sm text-[#90A1B9]">
          {t("auth.loginForm.subtitle")}
        </Text>
      </View>

      <View className="mb-5 w-full">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthTextField
              label={t("auth.loginForm.email")}
              placeholder={t("auth.loginForm.emailPlaceholder")}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
            />
          )}
        />
      </View>

      <View className="mb-6 w-full">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthTextField
              label={t("auth.loginForm.password")}
              placeholder={t("auth.loginForm.passwordPlaceholder")}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <Pressable
          onPress={() => router.push("/forget-password" as Href)}
          className="mt-3 self-end active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-[#7B61FF]">
            {t("auth.loginForm.forgotPassword")}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="mb-6 w-full items-center justify-center rounded-2xl bg-[#7B61FF] py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.loginForm.loginButton")}
        </Text>
      </Pressable>

      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-[#E4E4E7]" />
        <Text className="mx-3 text-sm text-[#90A1B9]">
          {t("auth.loginForm.or")}
        </Text>
        <View className="h-px flex-1 bg-[#E4E4E7]" />
      </View>

      <Pressable
        onPress={() => router.push("/login-with-phone" as Href)}
        className="w-full items-center justify-center rounded-2xl border border-[#7B61FF] py-4 active:opacity-[0.92]"
      >
        <Text className="text-base font-bold text-[#7B61FF]">
          {t("auth.loginForm.loginWithPhone")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function LoginForm() {
  const { i18n } = useTranslation();

  return <LoginFormFields key={i18n.language} />;
}
