import type { ImageSourcePropType } from "react-native";

export type PostType = "announcements" | "news" | "poll" | "meeting";

export type Post = {
  id: string;
  authorName: string;
  authorAvatar: ImageSourcePropType;
  timestamp: string;
  title: string;
  body: string;
  likesCount: number;
  commentsCount: number;
  image?: ImageSourcePropType;
};
