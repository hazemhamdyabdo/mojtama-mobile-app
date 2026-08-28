import { View } from "react-native";

type SkeletonBlockProps = {
  className?: string;
};

export default function SkeletonBlock({ className }: SkeletonBlockProps) {
  return <View className={`rounded-xl bg-slate-100 ${className ?? ""}`} />;
}
