import ChatIcon from "@/features/home/components/ChatIcon";
import CreatePostBottomSheet, {
  type CreatePostBottomSheetRef,
} from "@/features/home/components/CreatePostBottomSheet";
import FilterChip from "@/features/home/components/FilterChip";
import PostsFeed from "@/features/home/components/PostsFeed";
import SearchActionBar from "@/features/home/components/SearchActionBar";
import TopHeader from "@/features/home/components/TopHeader";
import type { PostType } from "@/features/home/types";
import { useRouter, type Href } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const createPostSheetRef = useRef<CreatePostBottomSheetRef>(null);

  const handleAddPostPress = () => {
    createPostSheetRef.current?.open();
  };

  const handleSelectPostType = (type: PostType) => {
    switch (type) {
      case "announcements":
        router.push("/create-announcement" as Href);
        break;
      case "news":
      case "poll":
      case "meeting":
        console.log("selected post type:", type);
        break;
      default: {
        const _exhaustive: never = type;
        console.log("selected post type:", _exhaustive);
      }
    }
  };

  return (
    <View className="relative flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-28 pt-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TopHeader />
        <SearchActionBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onAddPostPress={handleAddPostPress}
        />
        <FilterChip selectedId={selectedFilter} onSelect={setSelectedFilter} />
        <PostsFeed />
      </ScrollView>

      <ChatIcon />

      <CreatePostBottomSheet
        ref={createPostSheetRef}
        onSelectPostType={handleSelectPostType}
      />
    </View>
  );
}
