import { z } from "zod";

export const createRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  requestType: z.string().min(1, "Request type is required"),
  issueType: z.string().optional(),
  priority: z.string().min(1, "Request priority is required"),
});

export const editRequestSchema = createRequestSchema.superRefine(
  (data, context) => {
    if (
      (data.requestType === "maintenance" || data.requestType === "emergency") &&
      !data.issueType
    ) {
      context.addIssue({
        code: "custom",
        message: "Issue type is required",
        path: ["issueType"],
      });
    }
  },
);

export type CreateRequestFormValues = z.infer<typeof createRequestSchema>;
