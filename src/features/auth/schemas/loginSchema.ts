import type { TFunction } from "i18next";
import { z } from "zod";

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z
      .string()
      .min(1, t("auth.loginForm.validation.emailRequired"))
      .email(t("auth.loginForm.validation.emailInvalid")),
    password: z
      .string()
      .min(1, t("auth.loginForm.validation.passwordRequired"))
      .min(8, t("auth.loginForm.validation.passwordMin")),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
