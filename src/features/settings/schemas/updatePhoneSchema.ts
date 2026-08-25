import {
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";
import { z } from "zod";

export function createUpdatePhoneSchema(countryIso: CountryCode) {
  return z.object({
    countryIso: z.string(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => isValidPhoneNumber(value, countryIso),
        "Enter a valid phone number",
      ),
  });
}

export type UpdatePhoneFormValues = z.infer<
  ReturnType<typeof createUpdatePhoneSchema>
>;
