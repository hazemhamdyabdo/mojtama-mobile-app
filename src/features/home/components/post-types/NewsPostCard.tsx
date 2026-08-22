import {
  ExpandablePostBody,
  PostCardHeader,
  PostCardShell,
  PostEngagementFooter,
} from "@/features/home/components/post-types/PostCardShared";
import type { NewsPost } from "@/features/home/types";
import { useState } from "react";

type NewsPostCardProps = {
  post: NewsPost;
  onPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onLikesPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function NewsPostCard({
  post,
  onPress,
  onMenuPress,
  onLikesPress,
  onCommentsPress,
}: NewsPostCardProps) {
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
        showImage={post.image}
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
