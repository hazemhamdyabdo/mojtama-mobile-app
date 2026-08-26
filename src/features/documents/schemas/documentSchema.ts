import { z } from "zod";

export const documentFormSchema = z.object({
  title: z.string().min(1, "Document name is required"),
  category: z.string().min(1, "Category is required"),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
