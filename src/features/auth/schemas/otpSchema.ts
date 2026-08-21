import type { TFunction } from "i18next";
import { z } from "zod";

export const OTP_LENGTH = 5;

export function createOtpSchema(t: TFunction) {
  return z.object({
    otp: z
      .string()
      .length(OTP_LENGTH, t("auth.verifyOtp.validation.otpLength")),
  });
}

export type OtpFormValues = z.infer<ReturnType<typeof createOtpSchema>>;
