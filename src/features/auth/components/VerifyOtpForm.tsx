import { colors } from "@/theme/colors";
import {
  createOtpSchema,
  OTP_LENGTH,
  type OtpFormValues,
} from "@/features/auth/schemas/otpSchema";
import { verifyOtp } from "@/features/auth/api";
import type { AuthUserRole } from "@/features/auth/types";
import { MockApiError } from "@/utils/mockApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from "react-native";

const RESEND_SECONDS = 18;

type VerifyOtpFormProps = {
  phone: string;
  authRole?: string;
};

function VerifyOtpFormFields({ phone, authRole }: VerifyOtpFormProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const inputRefs = useRef<Array<TextInputType | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const otpSchema = useMemo(() => createOtpSchema(t), [t, i18n.language]);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleOtpChange = (index: number, text: string) => {
    const sanitizedDigit = text.replace(/\D/g, "").slice(-1);
    const digits = otpValue.padEnd(OTP_LENGTH, " ").split("");

    if (!sanitizedDigit && text.length === 0) {
      digits[index] = " ";
      const nextOtp = digits.join("").replace(/\s/g, "");
      setValue("otp", nextOtp, { shouldValidate: true });

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    digits[index] = sanitizedDigit;
    const nextOtp = digits.join("").replace(/\s/g, "");
    setValue("otp", nextOtp, { shouldValidate: true });

    if (sanitizedDigit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit = async (values: OtpFormValues) => {
    try {
      await verifyOtp({
        phone,
        otp: values.otp,
        role: authRole as AuthUserRole | undefined,
      });
      router.push("/(tabs)" as Href);
    } catch (error) {
      const message =
        error instanceof MockApiError
          ? error.message
          : t("auth.verifyOtp.validation.genericError", {
              defaultValue: "Unable to verify code. Please try again.",
            });
      setError("otp", { message });
    }
  };

  const formattedTimer = `00:${String(Math.max(secondsLeft, 0)).padStart(2, "0")}`;
  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="w-full">
      <View className="mb-10 w-full">
        <Text className="text-2xl font-semibold text-heading">
          {t("auth.verifyOtp.title")}
        </Text>
        <Text className="mt-1 text-sm text-sec-text" style={{ textAlign }}>
          {t("auth.verifyOtp.subtitle", { phone })}
        </Text>

        <Pressable
          onPress={() => router.replace("/login-with-phone" as Href)}
          className="mt-3 self-start active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-primary">
            {t("auth.verifyOtp.changeNumber")}
          </Text>
        </Pressable>
      </View>

      <Controller
        control={control}
        name="otp"
        render={() => (
          <View className="mb-2 flex-row justify-between gap-2">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={otpValue[index] ?? ""}
                onChangeText={(text) => handleOtpChange(index, text)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                style={[
                  styles.otpInput,
                  errors.otp ? styles.otpInputError : styles.otpInputDefault,
                ]}
              />
            ))}
          </View>
        )}
      />

      {errors.otp ? (
        <Text className="mb-4 text-sm text-rejected" style={{ textAlign }}>
          {errors.otp.message}
        </Text>
      ) : (
        <View className="mb-4" />
      )}

      <Text className="mb-8 text-sm text-sec-text" style={{ textAlign }}>
        {t("auth.verifyOtp.didNotReceive")}{" "}
        <Text className="text-input-text">
          {secondsLeft > 0
            ? t("auth.verifyOtp.retryIn", { time: formattedTimer })
            : t("auth.verifyOtp.resend")}
        </Text>
      </Text>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="mb-6 w-full items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.verifyOtp.loginButton")}
        </Text>
      </Pressable>

      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-slate-200" />
        <Text className="mx-3 text-sm text-sec-text">
          {t("auth.verifyOtp.or")}
        </Text>
        <View className="h-px flex-1 bg-slate-200" />
      </View>

      <Pressable
        onPress={() => router.replace("/login" as Href)}
        className="w-full items-center justify-center rounded-2xl border border-primary py-4 active:opacity-[0.92]"
      >
        <Text className="text-base font-bold text-primary">
          {t("auth.verifyOtp.loginWithEmail")}
        </Text>
      </Pressable>
    </View>
  );
}

export default function VerifyOtpForm({ phone, authRole }: VerifyOtpFormProps) {
  const { i18n } = useTranslation();
  return (
    <VerifyOtpFormFields
      key={`${i18n.language}-${phone}-${authRole ?? "default"}`}
      phone={phone}
      authRole={authRole}
    />
  );
}

const styles = StyleSheet.create({
  otpInput: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: colors.heading,
  },
  otpInputDefault: {
    borderColor: colors.cardBorder,
  },
  otpInputError: {
    borderColor: colors.rejected200,
  },
});
