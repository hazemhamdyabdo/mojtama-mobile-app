import type { PostType } from "@/features/home/types";

export type PostTypeOption = {
  id: PostType;
  title: string;
  description: string;
  icon: number;
};

export const POST_TYPE_OPTIONS: PostTypeOption[] = [
  {
    id: "announcements",
    title: "Announcements",
    description: "Important Community Announcements And Updates",
    icon: require("@/assets/images/home/announcements.png"),
  },
  {
    id: "news",
    title: "News",
    description: "Important Community Announcements And Updates",
    icon: require("@/assets/images/home/news.png"),
  },
  {
    id: "poll",
    title: "Poll",
    description: "Important Community Announcements And Updates",
    icon: require("@/assets/images/home/poll.png"),
  },
  {
    id: "meeting",
    title: "Meeting",
    description: "Important Community Announcements And Updates",
    icon: require("@/assets/images/home/meeting.png"),
  },
];
