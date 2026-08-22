import PostCard from "@/features/home/components/post-types/PostCard";
import { DUMMY_POSTS } from "@/features/home/constants/dummy";
import type { Post } from "@/features/home/types";
import { View } from "react-native";

type PostsFeedProps = {
  posts?: Post[];
  onPostPress?: (postId: string) => void;
  onMenuPress?: (postId: string) => void;
  onLikesPress?: (postId: string) => void;
  onCommentsPress?: (postId: string) => void;
};

export default function PostsFeed({
  posts = DUMMY_POSTS,
  onPostPress,
  onMenuPress,
  onLikesPress,
  onCommentsPress,
}: PostsFeedProps) {
  return (
    <View className="gap-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPress={onPostPress}
          onMenuPress={onMenuPress}
          onLikesPress={onLikesPress}
          onCommentsPress={onCommentsPress}
        />
      ))}
    </View>
  );
}
