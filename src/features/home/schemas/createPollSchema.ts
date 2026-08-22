import { z } from "zod";

const MAX_POLL_OPTIONS = 10;
const MIN_POLL_OPTIONS = 2;

export const pollOptionSchema = z.object({
  label: z.string().trim().min(1, "Option is required"),
});

export function createPollSchema() {
  return z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title must be 200 characters or less"),
      deadlineDate: z.date().nullable(),
      deadlineTime: z.date().nullable(),
      isEmergency: z.boolean(),
      options: z
        .array(pollOptionSchema)
        .min(MIN_POLL_OPTIONS, "At least 2 options are required")
        .max(MAX_POLL_OPTIONS, `Maximum ${MAX_POLL_OPTIONS} options allowed`),
      allowMembersToAddOptions: z.boolean(),
      allowMultipleChoice: z.boolean(),
    })
    .superRefine((data, ctx) => {
      const hasDate = data.deadlineDate !== null;
      const hasTime = data.deadlineTime !== null;

      if (hasDate !== hasTime) {
        ctx.addIssue({
          code: "custom",
          message: "Both date and time are required for the deadline",
          path: ["deadlineDate"],
        });
      }
    });
}

export type CreatePollFormValues = z.infer<ReturnType<typeof createPollSchema>>;

export const POLL_FORM_LIMITS = {
  minOptions: MIN_POLL_OPTIONS,
  maxOptions: MAX_POLL_OPTIONS,
} as const;
