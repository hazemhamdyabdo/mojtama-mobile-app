import { colors } from "@/theme/colors";
import { OTP_LENGTH } from "@/features/auth/schemas/otpSchema";
import SettingsPrimaryButton from "@/features/settings/components/SettingsPrimaryButton";
import SettingsUpdateIntro from "@/features/settings/components/SettingsUpdateIntro";
import { MockApiError } from "@/utils/mockApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from "react-native";
import { z } from "zod";

const RESEND_SECONDS = 18;

const otpSchema = z.object({
  otp: z.string().length(OTP_LENGTH, `Enter the ${OTP_LENGTH}-digit code`),
});

type OtpFormValues = z.infer<typeof otpSchema>;

type SettingsOtpFormProps = {
  title: string;
  subtitle: string;
  changeLinkLabel: string;
  onChangePress: () => void;
  onSubmit: (otp: string) => void | Promise<void>;
};

export default function SettingsOtpForm({
  title,
  subtitle,
  changeLinkLabel,
  onChangePress,
  onSubmit,
}: SettingsOtpFormProps) {
  const inputRefs = useRef<Array<TextInputType | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [apiError, setApiError] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
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

  const formattedTimer = `00:${String(Math.max(secondsLeft, 0)).padStart(2, "0")}`;

  return (
    <View className="w-full">
      <SettingsUpdateIntro title={title} subtitle={subtitle} />

      <Pressable
        onPress={onChangePress}
        accessibilityRole="button"
        className="mb-8 self-start active:opacity-[0.92]"
      >
        <Text className="text-sm font-medium text-primary underline">
          {changeLinkLabel}
        </Text>
      </Pressable>

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
        <Text className="mb-4 text-sm text-rejected">{errors.otp.message}</Text>
      ) : apiError ? (
        <Text className="mb-4 text-sm text-rejected">{apiError}</Text>
      ) : (
        <View className="mb-4" />
      )}

      <Text className="mb-8 text-sm text-heading">
        Didn't Receive The OTP?{" "}
        <Text className="text-sec-text">
          {secondsLeft > 0 ? `Retry In ${formattedTimer}` : "Resend Code"}
        </Text>
      </Text>

      <SettingsPrimaryButton
        label="Next"
        disabled={isSubmitting}
        onPress={() =>
          void handleSubmit(async (values) => {
            setApiError("");
            try {
              await onSubmit(values.otp);
            } catch (error) {
              setApiError(
                error instanceof MockApiError
                  ? error.message
                  : "Invalid OTP code",
              );
            }
          })()
        }
      />
    </View>
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
