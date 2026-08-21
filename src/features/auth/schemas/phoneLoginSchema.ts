import type { TFunction } from "i18next";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { z } from "zod";

export function createPhoneLoginSchema(
  t: TFunction,
  countryIso: CountryCode,
) {
  return z.object({
    countryIso: z.string(),
    phone: z
      .string()
      .min(1, t("auth.phoneLogin.validation.phoneRequired"))
      .refine(
        (value) => isValidPhoneNumber(value, countryIso),
        t("auth.phoneLogin.validation.phoneInvalid"),
      ),
  });
}

export type PhoneLoginFormValues = z.infer<
  ReturnType<typeof createPhoneLoginSchema>
>;

export function formatPhoneNumberE164(
  countryIso: CountryCode,
  phone: string,
) {
  const parsed = parsePhoneNumberFromString(phone, countryIso);

  if (parsed?.isValid()) {
    return parsed.number;
  }

  return phone.replace(/\s/g, "");
}
