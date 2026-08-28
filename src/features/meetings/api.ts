import {
  getPostFromState,
  getPostsState,
  getPollVoteFromState,
  updatePostInState,
  voteOnPollInState,
} from "@/features/home/store/postState";
import type { AttendeeStatus, MeetingPost, PollPost } from "@/features/home/types";
import { isMeetingPost } from "@/features/home/utils/buildPostFromForm";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export type MeetingResponse = "attending" | "declined";

export async function getMeetings(): Promise<MeetingPost[]> {
  await mockDelay();
  return getPostsState().filter(isMeetingPost);
}

export async function getMeetingById(meetingId: string): Promise<MeetingPost> {
  await mockDelay();

  const post = getPostFromState(meetingId);
  if (!post || !isMeetingPost(post)) {
    throw new MockApiError("Meeting not found", 404);
  }

  return post;
}

export async function respondToMeeting(
  meetingId: string,
  response: MeetingResponse,
): Promise<MeetingPost> {
  await mockDelay();

  const post = getPostFromState(meetingId);
  if (!post || !isMeetingPost(post)) {
    throw new MockApiError("Meeting not found", 404);
  }

  const status: AttendeeStatus =
    response === "attending" ? "attending" : "declined";

  const attendeeIndex = post.attendees.findIndex(
    (attendee) => attendee.group === "residents" && attendee.status === "awaiting",
  );
  const indexToUpdate =
    attendeeIndex >= 0
      ? attendeeIndex
      : post.attendees.findIndex((attendee) => attendee.group === "residents");

  if (indexToUpdate < 0) {
    throw new MockApiError("No resident attendee found for this meeting", 404);
  }

  const updatedAttendees = post.attendees.map((attendee, index) =>
    index === indexToUpdate ? { ...attendee, status } : attendee,
  );

  const updated: MeetingPost = {
    ...post,
    attendees: updatedAttendees,
  };

  updatePostInState(updated);
  return updated;
}
