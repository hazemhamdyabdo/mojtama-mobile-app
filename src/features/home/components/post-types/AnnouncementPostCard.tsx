import {
  ExpandablePostBody,
  PostCardHeader,
  PostCardShell,
  PostEngagementFooter,
} from "@/features/home/components/post-types/PostCardShared";
import type { AnnouncementPost } from "@/features/home/types";
import { useState } from "react";

type AnnouncementPostCardProps = {
  post: AnnouncementPost;
  onPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onLikesPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function AnnouncementPostCard({
  post,
  onPress,
  onMenuPress,
  onLikesPress,
  onCommentsPress,
}: AnnouncementPostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <PostCardShell onPress={() => onPress?.(post.id)}>
      <PostCardHeader
        authorName={post.authorName}
        authorAvatar={post.authorAvatar}
        timestamp={post.timestamp}
        onMenuPress={() => onMenuPress?.(post.id)}
      />

      <ExpandablePostBody
        title={post.title}
        body={post.body}
        expanded={expanded}
        onExpand={() => setExpanded(true)}
      />

      <PostEngagementFooter
        likesCount={post.likesCount + (liked ? 1 : 0)}
        commentsCount={post.commentsCount}
        liked={liked}
        onLikePress={() => setLiked((prev) => !prev)}
        onLikesPress={() => onLikesPress?.(post.id)}
        onCommentsPress={() => onCommentsPress?.(post.id)}
      />
    </PostCardShell>
  );
}
