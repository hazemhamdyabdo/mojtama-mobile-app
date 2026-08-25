import type { CreateAnnouncementFormValues } from "@/features/home/schemas/createAnnouncementSchema";
import type { CreateMeetingFormValues } from "@/features/home/schemas/createMeetingSchema";
import type { CreatePostFormValues } from "@/features/home/schemas/createPostSchema";
import type { CreatePollFormValues } from "@/features/home/schemas/createPollSchema";

export async function createAnnouncementPost(
  values: CreateAnnouncementFormValues,
) {
  // TODO: replace with real API call
  console.log("POST /announcements", values);
}

export async function createNewsPost(values: CreatePostFormValues) {
  // TODO: replace with real API call
  console.log("POST /news", values);
}

export async function createPollPost(values: CreatePollFormValues) {
  // TODO: replace with real API call
  console.log("POST /polls", values);
}

export async function createMeetingPost(values: CreateMeetingFormValues) {
  // TODO: replace with real API call
  console.log("POST /meetings", values);
}
