import { VISIBILITY_VALUES } from "@/features/home/constants/visibilityOptions";
import type { CreateAnnouncementFormValues } from "@/features/home/schemas/createAnnouncementSchema";
import type { CreateMeetingFormValues } from "@/features/home/schemas/createMeetingSchema";
import type { CreatePostFormValues } from "@/features/home/schemas/createPostSchema";
import type { CreatePollFormValues } from "@/features/home/schemas/createPollSchema";
import type {
  AnnouncementPost,
  MeetingPost,
  NewsPost,
  PollPost,
  Post,
} from "@/features/home/types";
import { createMockId } from "@/utils/mockApi";

const mojtamaAvatar = require("@/features/home/constants/mojtama-avatar.png");
const dummyFeedImage = require("@/features/home/constants/dummy-feed.jpg");
const dummyUserAvatar = require("@/features/home/constants/dummy-avatar.jpg");

function formatPostedAt(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `Today , ${displayHours}:${minutes} ${period}`;
}

function formatMeetingDate(date: Date): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

function formatMeetingTime(start: Date, end: Date): string {
  const formatTime = (value: Date) => {
    const hours = value.getHours();
    const minutes = value.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  return `${formatTime(start)} — ${formatTime(end)}`;
}

function meetingDurationHours(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime();
  const hours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));
  return `${hours}h`;
}

function formatVisibility(value: (typeof VISIBILITY_VALUES)[number]): string {
  switch (value) {
    case "all-members":
      return "All Members";
    case "residents":
      return "Residents Only";
    case "managers":
      return "Managers Only";
    default: {
      const exhaustive: never = value;
      return exhaustive;
    }
  }
}

export function buildAnnouncementPostFromForm(
  values: CreateAnnouncementFormValues,
): AnnouncementPost {
  const now = new Date();

  return {
    id: createMockId("post"),
    type: "announcements",
    authorName: "Mojtama - مجتمع",
    authorAvatar: mojtamaAvatar,
    timestamp: "Just now",
    title: values.title,
    body: values.content,
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    category: values.categoryType,
    postedAt: formatPostedAt(now),
    visibility: formatVisibility(values.visibility),
  };
}

export function buildNewsPostFromForm(values: CreatePostFormValues): NewsPost {
  const now = new Date();

  return {
    id: createMockId("post"),
    type: "news",
    authorName: "Mojtama - مجتمع",
    authorAvatar: mojtamaAvatar,
    timestamp: "Just now",
    title: values.title,
    body: values.content,
    image: values.image?.uri ? { uri: values.image.uri } : dummyFeedImage,
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    category: values.categoryType,
    postedAt: formatPostedAt(now),
    visibility: "All Members",
  };
}

export function buildPollPostFromForm(values: CreatePollFormValues): PollPost {
  const now = new Date();

  return {
    id: createMockId("post"),
    type: "poll",
    authorName: "Mojtama - مجتمع",
    authorAvatar: mojtamaAvatar,
    timestamp: "Just now",
    title: values.title,
    body: values.title,
    options: values.options.map((option, index) => ({
      id: `opt-${index}`,
      label: option.label,
      votes: 0,
    })),
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    category: "General",
    postedAt: formatPostedAt(now),
    visibility: "All Members",
  };
}

export function buildMeetingPostFromForm(
  values: CreateMeetingFormValues,
): MeetingPost {
  const now = new Date();
  const date = values.date ?? now;
  const startTime = values.startTime ?? now;
  const endTime = values.endTime ?? now;
  const location = values.location;

  return {
    id: createMockId("post"),
    type: "meeting",
    title: values.title,
    status: "Upcoming",
    body: values.agenda,
    agenda: values.title,
    leadBy: {
      name: values.ledBy?.name ?? "Community Manager",
      avatar: dummyUserAvatar,
    },
    createdBy: values.ledBy?.name ?? "Community Manager",
    meetingType:
      location?.type === "virtual" ? "Virtual meeting" : "In-Person meeting",
    location: location?.value ?? "Community hall",
    meetingLink: location?.type === "virtual" ? location.value : undefined,
    date: formatMeetingDate(date),
    time: formatMeetingTime(startTime, endTime),
    duration: meetingDurationHours(startTime, endTime),
    isPublic: values.isPublic,
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
    category: "General",
    postedAt: formatPostedAt(now),
    visibility: values.isPublic ? "All Members" : "Invited Members",
    attendees: values.invitees.map((invitee, index) => ({
      id: invitee.id || `inv-${index}`,
      name: invitee.name,
      unit: "—",
      status: "awaiting" as const,
      group: "residents" as const,
    })),
    agendaItems: [
      {
        id: "ag-new-1",
        title: values.agenda,
        timeRange: formatMeetingTime(startTime, endTime),
      },
    ],
  };
}

export function isMeetingPost(post: Post): post is MeetingPost {
  return post.type === "meeting";
}
