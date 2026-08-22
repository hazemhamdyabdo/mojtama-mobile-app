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
  viewsCount: number;
  category: string;
  postedAt: string;
  visibility: string;
  image?: ImageSourcePropType;
};

export type PostLike = {
  id: string;
  name: string;
  unit: string;
  time: string;
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
