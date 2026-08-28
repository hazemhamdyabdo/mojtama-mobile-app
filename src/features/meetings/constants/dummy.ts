import { DUMMY_POSTS } from "@/features/home/constants/dummy";
import type { MeetingPost } from "@/features/home/types";

export const MEETINGS_TABS = [
  { id: "upcoming" as const, label: "Upcoming" },
  { id: "previous" as const, label: "Previous" },
];

export type MeetingsTab = (typeof MEETINGS_TABS)[number]["id"];

export function getMeetingPosts(): MeetingPost[] {
  return DUMMY_POSTS.filter(
    (post): post is MeetingPost => post.type === "meeting",
  );
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

  const post = DUMMY_POSTS.find((item) => item.id === meetingId);

  return post?.type === "meeting" ? post : undefined;
}
