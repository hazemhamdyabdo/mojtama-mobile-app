import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { Text, View } from "react-native";

type PersonValueProps = {
  person: {
    name: string;
    avatar?: ImageSourcePropType;
  };
};

export default function PersonValue({ person }: PersonValueProps) {
  return (
    <View className="flex-row items-center gap-2">
      {person.avatar ? (
        <Image
          source={person.avatar}
          contentFit="cover"
          style={{ width: 24, height: 24, borderRadius: 100 }}
        />
      ) : null}
      <Text className="text-sm font-semibold text-heading">{person.name}</Text>
    </View>
  );
}
