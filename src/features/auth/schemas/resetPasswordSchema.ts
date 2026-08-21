import type { TFunction } from "i18next";
import { z } from "zod";

export function createResetPasswordSchema(t: TFunction) {
  return z
    .object({
      password: z
        .string()
        .min(1, t("auth.resetPassword.validation.passwordRequired"))
        .min(8, t("auth.resetPassword.validation.passwordMin")),
      confirmPassword: z
        .string()
        .min(1, t("auth.resetPassword.validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.resetPassword.validation.passwordsMustMatch"),
      path: ["confirmPassword"],
    });
}

export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;
