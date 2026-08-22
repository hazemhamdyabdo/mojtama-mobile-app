import AnnouncementPostCard from "@/features/home/components/post-types/AnnouncementPostCard";
import MeetingPostCard from "@/features/home/components/post-types/MeetingPostCard";
import NewsPostCard from "@/features/home/components/post-types/NewsPostCard";
import PollPostCard from "@/features/home/components/post-types/PollPostCard";
import type { Post } from "@/features/home/types";

type PostCardProps = {
  post: Post;
  onPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onLikesPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function PostCard(props: PostCardProps) {
  switch (props.post.type) {
    case "announcements":
      return <AnnouncementPostCard {...props} post={props.post} />;
    case "news":
      return <NewsPostCard {...props} post={props.post} />;
    case "meeting":
      return <MeetingPostCard {...props} post={props.post} />;
    case "poll":
      return <PollPostCard {...props} post={props.post} />;
    default: {
      const _exhaustive: never = props.post;
      return _exhaustive;
    }
  }
}
