import { z } from "zod";

export const updateEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;
