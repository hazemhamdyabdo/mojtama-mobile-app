import { z } from "zod";

export const meetingLocationSchema = z.object({
  type: z.enum(["virtual", "in-person"]),
  value: z.string().trim().min(1, "Location is required"),
});

export type MeetingLocation = z.infer<typeof meetingLocationSchema>;

const meetingMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export type MeetingMember = z.infer<typeof meetingMemberSchema>;

export function createMeetingSchema() {
  return z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title must be 200 characters or less"),
      agenda: z.string().trim().min(1, "Agenda is required"),
      date: z.date().nullable(),
      startTime: z.date().nullable(),
      endTime: z.date().nullable(),
      location: meetingLocationSchema.nullable(),
      ledBy: meetingMemberSchema.nullable(),
      isPublic: z.boolean(),
      invitees: z.array(meetingMemberSchema),
    })
    .superRefine((data, ctx) => {
      if (data.date === null) {
        ctx.addIssue({
          code: "custom",
          message: "Meeting date is required",
          path: ["date"],
        });
      }

      if (data.startTime === null || data.endTime === null) {
        ctx.addIssue({
          code: "custom",
          message: "Start and end time are required",
          path: ["startTime"],
        });
      } else if (data.endTime <= data.startTime) {
        ctx.addIssue({
          code: "custom",
          message: "End time must be after start time",
          path: ["startTime"],
        });
      }

      if (data.location === null) {
        ctx.addIssue({
          code: "custom",
          message: "Location is required",
          path: ["location"],
        });
      }

      if (data.ledBy === null) {
        ctx.addIssue({
          code: "custom",
          message: "Meeting leader is required",
          path: ["ledBy"],
        });
      }
    });
}

export type CreateMeetingFormValues = z.infer<
  ReturnType<typeof createMeetingSchema>
>;
