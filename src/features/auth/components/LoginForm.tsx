import { colors } from "@/theme/colors";
import {
  createLoginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import {
  mapAuthRoleToServiceRole,
  saveUserRole,
} from "@/features/service/storage/userRole";
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
      <Text className="mb-2 text-sm font-medium text-label">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.secText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        className={`w-full rounded-xl border bg-white px-4 text-base text-heading placeholder:ps-4 ${
          error ? "border-rejected-200" : "border-card-border"
        }`}
        style={{
          textAlign,
          minHeight: 52,
          paddingVertical: 14,
        }}
      />
      {error ? (
        <Text className="mt-2 text-sm text-rejected" style={{ textAlign }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type LoginFormFieldsProps = {
  authRole?: string;
};

function LoginFormFields({ authRole }: LoginFormFieldsProps) {
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

  const onSubmit = async (values: LoginFormValues) => {
    // TODO: connect to auth API
    console.log("login", values);

    const serviceRole = mapAuthRoleToServiceRole(authRole);
    if (serviceRole) {
      await saveUserRole(serviceRole);
    }

    router.push("/(tabs)" as Href);
  };

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-heading">
          {t("auth.loginForm.welcomeBack")}
        </Text>
        <Text className="mt-1 text-sm text-sec-text">
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
          <Text className="text-sm font-medium text-primary">
            {t("auth.loginForm.forgotPassword")}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="mb-6 w-full items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.loginForm.loginButton")}
        </Text>
      </Pressable>

      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-slate-200" />
        <Text className="mx-3 text-sm text-sec-text">
          {t("auth.loginForm.or")}
        </Text>
        <View className="h-px flex-1 bg-slate-200" />
      </View>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/login-with-phone",
            params: authRole ? { role: authRole } : undefined,
          } as Href)
        }
        className="w-full items-center justify-center rounded-2xl border border-primary py-4 active:opacity-[0.92]"
      >
        <Text className="text-base font-bold text-primary">
          {t("auth.loginForm.loginWithPhone")}
        </Text>
      </Pressable>
    </View>
  );
}

type LoginFormProps = {
  authRole?: string;
};

export default function LoginForm({ authRole }: LoginFormProps) {
  const { i18n } = useTranslation();

  return (
    <LoginFormFields key={`${i18n.language}-${authRole ?? "default"}`} authRole={authRole} />
  );
}
