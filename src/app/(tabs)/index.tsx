import ChatIcon from "@/features/home/components/ChatIcon";
import CommentsBottomSheet, {
  type CommentsBottomSheetRef,
} from "@/features/home/components/CommentsBottomSheet";
import CreatePostBottomSheet, {
  type CreatePostBottomSheetRef,
} from "@/features/home/components/CreatePostBottomSheet";
import FilterChip from "@/features/home/components/FilterChip";
import LikesBottomSheet, {
  type LikesBottomSheetRef,
} from "@/features/home/components/LikesBottomSheet";
import PostActionsBottomSheet, {
  type PostActionsBottomSheetRef,
} from "@/features/home/components/PostActionsBottomSheet";
import PostsFeed from "@/features/home/components/PostsFeed";
import SearchActionBar from "@/features/home/components/SearchActionBar";
import TopHeader from "@/features/home/components/TopHeader";
import ListSkeleton from "@/components/skeleton/ListSkeleton";
import {
  addComment,
  deletePost,
  getComments,
  getLikes,
  getPosts,
  markPostAsUrgent,
  movePostToDraft,
} from "@/features/home/api";
import { useMockListFetch } from "@/hooks/useMockListFetch";
import { useUserState } from "@/features/settings/hooks/useUserState";
import { useNotificationsState } from "@/features/notifications/hooks/useNotificationsState";
import { usePostsState } from "@/features/home/hooks/usePostsState";
import type { Post, PostType } from "@/features/home/types";
import { isMeetingPost } from "@/features/home/utils/buildPostFromForm";
import { useRouter, type Href } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

function filterPosts(
  posts: Post[],
  searchQuery: string,
  selectedFilter: string,
): Post[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filterType =
    selectedFilter === "meetings" ? "meeting" : selectedFilter;

  return posts.filter((post) => {
    const matchesFilter =
      selectedFilter === "all" || post.type === filterType;

    const searchableText = [
      post.title,
      post.type === "meeting" ? post.body : "",
      post.type !== "meeting" ? post.body : "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedQuery.length === 0 ||
      searchableText.includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const posts = usePostsState();
  const isLoadingPosts = useMockListFetch(getPosts);
  const user = useUserState();
  const { unreadCount } = useNotificationsState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeComments, setActiveComments] = useState<
    Awaited<ReturnType<typeof getComments>>
  >([]);
  const [activeLikes, setActiveLikes] = useState<
    Awaited<ReturnType<typeof getLikes>>
  >([]);
  const createPostSheetRef = useRef<CreatePostBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);
  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);

  const visiblePosts = useMemo(
    () => filterPosts(posts, searchQuery, selectedFilter),
    [posts, searchQuery, selectedFilter],
  );

  const handleAddPostPress = () => {
    createPostSheetRef.current?.open();
  };

  const handleSelectPostType = (type: PostType) => {
    switch (type) {
      case "announcements":
        router.push("/create-announcement" as Href);
        break;
      case "news":
        router.push("/create-news" as Href);
        break;
      case "poll":
        router.push("/create-poll" as Href);
        break;
      case "meeting":
        router.push("/create-meeting" as Href);
        break;
      default: {
        const _exhaustive: never = type;
        console.log("selected post type:", _exhaustive);
      }
    }
  };

  const handleMenuPress = (postId: string) => {
    postActionsSheetRef.current?.open(postId);
  };

  const handlePostPress = (postId: string) => {
    const post = posts.find((item) => item.id === postId);

    if (post && isMeetingPost(post)) {
      router.push(`/meeting/${postId}` as Href);
      return;
    }

    router.push(`/post/${postId}` as Href);
  };

  const handleLikesPress = async (postId: string) => {
    const likes = await getLikes(postId);
    setActiveLikes(likes);
    likesSheetRef.current?.open(postId);
  };

  const handleCommentsPress = async (postId: string) => {
    const comments = await getComments(postId);
    setActiveComments(comments);
    commentsSheetRef.current?.open(postId);
  };

  return (
    <View className="relative flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-28 pt-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TopHeader
          name={user.name.split(" ")[0] ?? user.name}
          unit={user.units[0]?.label ?? "Unit"}
          notificationCount={unreadCount}
          onNotificationsPress={() => router.push("/notifications" as Href)}
        />
        <SearchActionBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onAddPostPress={handleAddPostPress}
        />
        <FilterChip selectedId={selectedFilter} onSelect={setSelectedFilter} />
        {isLoadingPosts ? (
          <ListSkeleton />
        ) : (
          <PostsFeed
            posts={visiblePosts}
            onPostPress={handlePostPress}
            onMenuPress={handleMenuPress}
            onLikesPress={(postId) => void handleLikesPress(postId)}
            onCommentsPress={(postId) => void handleCommentsPress(postId)}
          />
        )}
      </ScrollView>

      <ChatIcon onPress={() => router.push("/ai-chat" as Href)} />

      <CreatePostBottomSheet
        ref={createPostSheetRef}
        onSelectPostType={handleSelectPostType}
      />

      <PostActionsBottomSheet
        ref={postActionsSheetRef}
        onMoveToDraft={(postId) => void movePostToDraft(postId)}
        onEditPost={(postId) => router.push(`/post/${postId}` as Href)}
        onMarkAsUrgent={(postId, isUrgent) =>
          void markPostAsUrgent(postId, isUrgent)
        }
        onDeletePost={(postId) => void deletePost(postId)}
      />

      <LikesBottomSheet ref={likesSheetRef} likes={activeLikes} />

      <CommentsBottomSheet
        ref={commentsSheetRef}
        comments={activeComments}
        onSendComment={(postId, text) => {
          void addComment(postId, text).then((comment) => {
            setActiveComments((current) => [comment, ...current]);
          });
        }}
      />
    </View>
  );
}
