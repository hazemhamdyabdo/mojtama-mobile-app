import { Text, View } from "react-native";

type ChatDateSeparatorProps = {
  label: string;
};

export default function ChatDateSeparator({ label }: ChatDateSeparatorProps) {
  return (
    <View className="my-4 items-center">
      <View className="rounded-full bg-slate-100 px-4 py-1">
        <Text className="text-xs font-medium text-slate-500">{label}</Text>
      </View>
    </View>
  );
}
