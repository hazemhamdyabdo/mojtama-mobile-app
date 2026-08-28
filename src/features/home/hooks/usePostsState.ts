import {
  getPostsState,
  subscribeToPosts,
} from "@/features/home/store/postState";
import { useEffect, useState } from "react";

export function usePostsState() {
  const [posts, setPosts] = useState(getPostsState());

  useEffect(() => {
    return subscribeToPosts(() => {
      setPosts(getPostsState());
    });
  }, []);

  return posts;
}

export function usePostById(postId: string | undefined) {
  const posts = usePostsState();
  return posts.find((post) => post.id === postId);
}
