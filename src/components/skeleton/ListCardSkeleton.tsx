import SkeletonBlock from "@/components/skeleton/SkeletonBlock";
import { View } from "react-native";

export default function ListCardSkeleton() {
  return (
    <View className="rounded-2xl border border-card-border bg-white p-4">
      <View className="flex-row items-center justify-between">
        <SkeletonBlock className="h-3 w-24 rounded-full" />
        <SkeletonBlock className="h-6 w-16 rounded-full" />
      </View>

      <SkeletonBlock className="mt-4 h-32 w-full rounded-2xl" />
      <SkeletonBlock className="mt-4 h-12 w-full rounded-xl" />
    </View>
  );
}
