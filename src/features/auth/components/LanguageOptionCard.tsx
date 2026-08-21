import { Image, Pressable, Text, View } from "react-native";

type LanguageOptionCardProps = {
  title: string;
  subtitle: string;
  flagSource: number;
  selected: boolean;
  onPress: () => void;
};

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <View
      className={`size-5 items-center justify-center rounded-full border-2 ${
        selected ? "border-[#7B61FF]" : "border-[#D1D5DB]"
      }`}
    >
      {selected ? <View className="size-2.5 rounded-full bg-[#7B61FF]" /> : null}
    </View>
  );
}

export default function LanguageOptionCard({
  title,
  subtitle,
  flagSource,
  selected,
  onPress,
}: LanguageOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full rounded-xl border border-gray-200 bg-white p-6 active:opacity-[0.92]"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center gap-2">
          <Image
            source={flagSource}
            resizeMode="contain"
            className="size-6"
          />
          <View className="flex-col">
            <Text className="text-sm font-bold text-black">{title}</Text>
            <Text className="text-sm font-normal text-[#2E2E2E]">{subtitle}</Text>
          </View>
        </View>
        <RadioIndicator selected={selected} />
      </View>
    </Pressable>
  );
}
