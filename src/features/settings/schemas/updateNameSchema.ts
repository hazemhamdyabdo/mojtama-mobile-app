import { z } from "zod";

export const updateNameSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
});

export type UpdateNameFormValues = z.infer<typeof updateNameSchema>;
