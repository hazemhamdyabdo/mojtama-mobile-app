import FilterChip from "@/features/home/components/FilterChip";
import SearchActionBar from "@/features/home/components/SearchActionBar";
import TopHeader from "@/features/home/components/TopHeader";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-6 pt-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TopHeader />
        <SearchActionBar value={searchQuery} onChangeText={setSearchQuery} />
        <FilterChip
          selectedId={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </ScrollView>
    </View>
  );
}
