import { Text, View } from "react-native";

type ProfileEmptyTabStateProps = {
  message: string;
};

export default function ProfileEmptyTabState({
  message,
}: ProfileEmptyTabStateProps) {
  return (
    <View className="items-center rounded-2xl border border-dashed border-card-border bg-slate-50 px-4 py-10">
      <Text className="text-center text-sm text-sec-text">{message}</Text>
    </View>
  );
}
