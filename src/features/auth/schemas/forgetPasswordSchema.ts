import type { TFunction } from "i18next";
import { z } from "zod";

export function createForgetPasswordSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, t("auth.forgetPassword.validation.emailRequired"))
      .email(t("auth.forgetPassword.validation.emailInvalid")),
  });
}

export type ForgetPasswordFormValues = z.infer<
  ReturnType<typeof createForgetPasswordSchema>
>;
