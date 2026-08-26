import { z } from "zod";

export const visitorSchema = z.object({
  name: z.string().min(1, "Visitor name is required"),
  building: z.string().min(1, "Building is required"),
  unit: z.string().min(1, "Unit is required"),
  gate: z.string().min(1, "Gate is required"),
  parkingSpot: z.string().min(1, "Parking spot is required"),
  purpose: z.string().min(1, "Purpose of visit is required"),
  date: z.string().min(1, "Preferred date is required"),
  time: z.string().min(1, "Preferred time is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
});

export type VisitorFormValues = z.infer<typeof visitorSchema>;
