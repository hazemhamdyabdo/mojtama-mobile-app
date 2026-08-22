import type { CreatePostFormValues } from "@/features/home/schemas/createPostSchema";

export async function createAnnouncementPost(values: CreatePostFormValues) {
  // TODO: replace with real API call
  console.log("POST /announcements", values);
}

export async function createNewsPost(values: CreatePostFormValues) {
  // TODO: replace with real API call
  console.log("POST /news", values);
}
