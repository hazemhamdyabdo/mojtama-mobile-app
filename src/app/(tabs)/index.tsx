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
import type { PostType } from "@/features/home/types";
import { DUMMY_POSTS } from "@/features/home/constants/dummy";
import { useRouter, type Href } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const createPostSheetRef = useRef<CreatePostBottomSheetRef>(null);
  const postActionsSheetRef = useRef<PostActionsBottomSheetRef>(null);
  const likesSheetRef = useRef<LikesBottomSheetRef>(null);
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);

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
    const post = DUMMY_POSTS.find((item) => item.id === postId);

    if (post?.type === "meeting") {
      router.push(`/meeting/${postId}` as Href);
      return;
    }

    router.push(`/post/${postId}` as Href);
  };

  const handleLikesPress = (postId: string) => {
    likesSheetRef.current?.open(postId);
  };

  const handleCommentsPress = (postId: string) => {
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
          onNotificationsPress={() => router.push("/notifications" as Href)}
        />
        <SearchActionBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onAddPostPress={handleAddPostPress}
        />
        <FilterChip selectedId={selectedFilter} onSelect={setSelectedFilter} />
        <PostsFeed
          onPostPress={handlePostPress}
          onMenuPress={handleMenuPress}
          onLikesPress={handleLikesPress}
          onCommentsPress={handleCommentsPress}
        />
      </ScrollView>

      <ChatIcon onPress={() => router.push("/ai-chat" as Href)} />

      <CreatePostBottomSheet
        ref={createPostSheetRef}
        onSelectPostType={handleSelectPostType}
      />

      <PostActionsBottomSheet
        ref={postActionsSheetRef}
        onMoveToDraft={(postId) => console.log("move to draft:", postId)}
        onEditPost={(postId) => console.log("edit post:", postId)}
        onMarkAsUrgent={(postId, isUrgent) =>
          console.log("mark as urgent:", postId, isUrgent)
        }
        onDeletePost={(postId) => console.log("delete post:", postId)}
      />

      <LikesBottomSheet ref={likesSheetRef} />

      <CommentsBottomSheet
        ref={commentsSheetRef}
        onSendComment={(postId, text) =>
          console.log("send comment:", postId, text)
        }
      />
    </View>
  );
}
