import ListCardSkeleton from "@/components/skeleton/ListCardSkeleton";
import { View } from "react-native";

type ListSkeletonProps = {
  count?: number;
  className?: string;
};

export default function ListSkeleton({
  count = 2,
  className,
}: ListSkeletonProps) {
  return (
    <View className={`gap-4 ${className ?? ""}`}>
      {Array.from({ length: count }, (_, index) => (
        <ListCardSkeleton key={index} />
      ))}
    </View>
  );
}
