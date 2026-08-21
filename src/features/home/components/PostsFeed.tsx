import PostCard from "@/features/home/components/PostCard";
import { DUMMY_POSTS } from "@/features/home/constants/dummy";
import type { Post } from "@/features/home/types";
import { View } from "react-native";

type PostsFeedProps = {
  posts?: Post[];
  onMenuPress?: (postId: string) => void;
};

export default function PostsFeed({
  posts = DUMMY_POSTS,
  onMenuPress,
}: PostsFeedProps) {
  return (
    <View className="gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onMenuPress={onMenuPress} />
      ))}
    </View>
  );
}
