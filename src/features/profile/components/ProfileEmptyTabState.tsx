import { Text, View } from "react-native";

type ProfileEmptyTabStateProps = {
  message: string;
};

export default function ProfileEmptyTabState({
  message,
}: ProfileEmptyTabStateProps) {
  return (
    <View className="items-center rounded-2xl border border-dashed border-[#E4E4E7] bg-[#F8FAFC] px-4 py-10">
      <Text className="text-center text-sm text-[#90A1B9]">{message}</Text>
    </View>
  );
}
