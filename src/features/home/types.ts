import type { ImageSourcePropType } from "react-native";

export type PostType = "announcements" | "news" | "poll" | "meeting";

type BasePost = {
  id: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  category: string;
  postedAt: string;
  visibility: string;
};

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type AnnouncementPost = BasePost & {
  type: "announcements";
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  title: string;
  body: string;
};

export type NewsPost = BasePost & {
  type: "news";
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  title: string;
  body: string;
  image: ImageSourcePropType;
};

export type AttendeeStatus = "attending" | "declined" | "awaiting";

export type MeetingAttendee = {
  id: string;
  name: string;
  unit: string;
  avatar?: ImageSourcePropType;
  status: AttendeeStatus;
  group: "team" | "residents";
};

export type AgendaItem = {
  id: string;
  title: string;
  timeRange: string;
};

export type MeetingPost = BasePost & {
  type: "meeting";
  title: string;
  status: string;
  body: string;
  agenda: string;
  leadBy: {
    name: string;
    avatar: ImageSourcePropType;
  };
  createdBy: string;
  meetingType: string;
  location: string;
  meetingLink?: string;
  date: string;
  time: string;
  duration: string;
  isPublic: boolean;
  attendees: MeetingAttendee[];
  agendaItems: AgendaItem[];
};

export type PollPost = BasePost & {
  type: "poll";
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  title: string;
  body: string;
  options: PollOption[];
};

export type Post = AnnouncementPost | NewsPost | MeetingPost | PollPost;

export type PostLike = {
  id: string;
  name: string;
  unit: string;
  time: string;
  avatar?: ImageSourcePropType;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: ImageSourcePropType;
};

export type PostComment = {
  id: string;
  authorName: string;
  time: string;
  text: string;
  likesCount: number;
  avatar?: ImageSourcePropType;
  replies?: PostComment[];
};
