import {
  DUMMY_COMMENTS,
  DUMMY_LIKES,
  DUMMY_POSTS,
} from "@/features/home/constants/dummy";
import type { Post, PostComment, PostLike, PollPost } from "@/features/home/types";

let postsState: Post[] = [...DUMMY_POSTS];
const likesByPostId = new Map<string, PostLike[]>(
  DUMMY_POSTS.map((post) => [post.id, [...DUMMY_LIKES]]),
);
const commentsByPostId = new Map<string, PostComment[]>(
  DUMMY_POSTS.map((post) => [post.id, [...DUMMY_COMMENTS]]),
);
const pollVotesByPostId = new Map<string, string>();
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getPostsState(): Post[] {
  return postsState;
}

export function getPostFromState(postId: string): Post | undefined {
  return postsState.find((post) => post.id === postId);
}

export function addPostToState(post: Post): void {
  postsState = [post, ...postsState];
  likesByPostId.set(post.id, []);
  commentsByPostId.set(post.id, []);
  notifyListeners();
}

export function updatePostInState(post: Post): void {
  postsState = postsState.map((current) =>
    current.id === post.id ? post : current,
  );
  notifyListeners();
}

export function deletePostFromState(postId: string): void {
  postsState = postsState.filter((post) => post.id !== postId);
  likesByPostId.delete(postId);
  commentsByPostId.delete(postId);
  pollVotesByPostId.delete(postId);
  notifyListeners();
}

export function getPollVoteFromState(postId: string): string | undefined {
  return pollVotesByPostId.get(postId);
}

export function voteOnPollInState(
  postId: string,
  optionId: string,
): PollPost | undefined {
  const post = getPostFromState(postId);
  if (!post || post.type !== "poll") {
    return undefined;
  }

  const previousOptionId = pollVotesByPostId.get(postId);
  if (previousOptionId === optionId) {
    return post;
  }

  const updatedOptions = post.options.map((option) => {
    let votes = option.votes;

    if (option.id === optionId) {
      votes += 1;
    }

    if (previousOptionId && option.id === previousOptionId) {
      votes = Math.max(0, votes - 1);
    }

    return { ...option, votes };
  });

  pollVotesByPostId.set(postId, optionId);

  const updatedPost: PollPost = {
    ...post,
    options: updatedOptions,
  };

  updatePostInState(updatedPost);
  return updatedPost;
}

export function getLikesFromState(postId: string): PostLike[] {
  return likesByPostId.get(postId) ?? [];
}

export function getCommentsFromState(postId: string): PostComment[] {
  return commentsByPostId.get(postId) ?? [];
}

export function addCommentToState(
  postId: string,
  comment: PostComment,
): PostComment {
  const existing = commentsByPostId.get(postId) ?? [];
  commentsByPostId.set(postId, [comment, ...existing]);

  const post = getPostFromState(postId);
  if (post) {
    updatePostInState({ ...post, commentsCount: post.commentsCount + 1 });
  } else {
    notifyListeners();
  }

  return comment;
}

export function subscribeToPosts(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetPostsState(): void {
  postsState = [...DUMMY_POSTS];
  likesByPostId.clear();
  commentsByPostId.clear();
  pollVotesByPostId.clear();
  DUMMY_POSTS.forEach((post) => {
    likesByPostId.set(post.id, [...DUMMY_LIKES]);
    commentsByPostId.set(post.id, [...DUMMY_COMMENTS]);
  });
  notifyListeners();
}
