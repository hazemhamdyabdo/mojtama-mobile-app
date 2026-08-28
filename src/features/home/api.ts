import {
  buildAnnouncementPostFromForm,
  buildMeetingPostFromForm,
  buildNewsPostFromForm,
  buildPollPostFromForm,
} from "@/features/home/utils/buildPostFromForm";
import type { CreateAnnouncementFormValues } from "@/features/home/schemas/createAnnouncementSchema";
import type { CreateMeetingFormValues } from "@/features/home/schemas/createMeetingSchema";
import type { CreatePostFormValues } from "@/features/home/schemas/createPostSchema";
import type { CreatePollFormValues } from "@/features/home/schemas/createPollSchema";
import {
  addCommentToState,
  addPostToState,
  deletePostFromState,
  getCommentsFromState,
  getLikesFromState,
  getPostFromState,
  getPostsState,
  getPollVoteFromState,
  updatePostInState,
  voteOnPollInState,
} from "@/features/home/store/postState";
import type { Post, PostComment, PostLike, PollPost } from "@/features/home/types";
import { MockApiError, createMockId, mockDelay } from "@/utils/mockApi";

const dummyUserAvatar = require("@/features/home/constants/dummy-avatar.jpg");

export async function getPosts(): Promise<Post[]> {
  await mockDelay();
  return getPostsState();
}

export async function getPostById(postId: string): Promise<Post> {
  await mockDelay();

  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }

  return post;
}

export async function createAnnouncementPost(
  values: CreateAnnouncementFormValues,
): Promise<Post> {
  await mockDelay();
  const post = buildAnnouncementPostFromForm(values);
  addPostToState(post);
  return post;
}

export async function createNewsPost(
  values: CreatePostFormValues,
): Promise<Post> {
  await mockDelay();
  const post = buildNewsPostFromForm(values);
  addPostToState(post);
  return post;
}

export async function createPollPost(
  values: CreatePollFormValues,
): Promise<Post> {
  await mockDelay();
  const post = buildPollPostFromForm(values);
  addPostToState(post);
  return post;
}

export async function createMeetingPost(
  values: CreateMeetingFormValues,
): Promise<Post> {
  await mockDelay();
  const post = buildMeetingPostFromForm(values);
  addPostToState(post);
  return post;
}

export type UpdatePostRequest = {
  title?: string;
  body?: string;
};

export async function updatePost(
  postId: string,
  updates: UpdatePostRequest,
): Promise<Post> {
  await mockDelay();

  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }

  const updated = {
    ...post,
    title: updates.title ?? post.title,
    body: updates.body ?? post.body,
  };

  updatePostInState(updated);
  return updated;
}

export async function deletePost(postId: string): Promise<void> {
  await mockDelay();

  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }

  deletePostFromState(postId);
}

export async function getComments(postId: string): Promise<PostComment[]> {
  await mockDelay(200);
  return getCommentsFromState(postId);
}

export async function addComment(
  postId: string,
  text: string,
): Promise<PostComment> {
  await mockDelay();

  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }

  const comment: PostComment = {
    id: createMockId("c"),
    authorName: "Omar Essam",
    time: "Just now",
    text,
    likesCount: 0,
    avatar: dummyUserAvatar,
  };

  return addCommentToState(postId, comment);
}

export async function getLikes(postId: string): Promise<PostLike[]> {
  await mockDelay(200);
  return getLikesFromState(postId);
}

export async function movePostToDraft(postId: string): Promise<void> {
  await mockDelay();
  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }
}

export async function markPostAsUrgent(
  postId: string,
  _isUrgent: boolean,
): Promise<void> {
  await mockDelay();
  const post = getPostFromState(postId);
  if (!post) {
    throw new MockApiError("Post not found", 404);
  }
}

export async function voteOnPoll(
  postId: string,
  optionId: string,
): Promise<PollPost> {
  await mockDelay(200);

  const updated = voteOnPollInState(postId, optionId);
  if (!updated) {
    throw new MockApiError("Poll not found", 404);
  }

  return updated;
}

export { getPollVoteFromState };
