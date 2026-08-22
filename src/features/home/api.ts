import type { CreatePostFormValues } from "@/features/home/schemas/createPostSchema";
import type { CreatePollFormValues } from "@/features/home/schemas/createPollSchema";

export async function createAnnouncementPost(values: CreatePostFormValues) {
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
