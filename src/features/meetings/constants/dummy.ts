import {
  getPostFromState,
  getPostsState,
} from "@/features/home/store/postState";
import type { MeetingPost } from "@/features/home/types";
import { isMeetingPost } from "@/features/home/utils/buildPostFromForm";

export const MEETINGS_TABS = [
  { id: "upcoming" as const, label: "Upcoming" },
  { id: "previous" as const, label: "Previous" },
];

export type MeetingsTab = (typeof MEETINGS_TABS)[number]["id"];

export function getMeetingPosts(): MeetingPost[] {
  return getPostsState().filter(isMeetingPost);
}

export function isUpcomingMeeting(meeting: MeetingPost): boolean {
  return meeting.status.toLowerCase() === "upcoming";
}

export function filterMeetingsByTab(
  meetings: MeetingPost[],
  tab: MeetingsTab,
): MeetingPost[] {
  return meetings.filter((meeting) =>
    tab === "upcoming"
      ? isUpcomingMeeting(meeting)
      : !isUpcomingMeeting(meeting),
  );
}

export function getMeetingPostById(
  meetingId: string | undefined,
): MeetingPost | undefined {
  if (!meetingId) {
    return undefined;
  }

  const post = getPostFromState(meetingId);

  return post && isMeetingPost(post) ? post : undefined;
}
