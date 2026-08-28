import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { Pressable, Text } from "react-native";

type ExpandablePostBodyProps = {
  title: string;
  body: string;
  expanded: boolean;
  onExpand: () => void;
  showImage?: ImageSourcePropType;
};

export default function ExpandablePostBody({
  title,
  body,
  expanded,
  onExpand,
  showImage,
}: ExpandablePostBodyProps) {
  return (
    <>
      {showImage ? (
        <Image
          source={showImage}
          contentFit="cover"
          style={{
            width: "100%",
            height: 200,
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      ) : null}

      <Text className="mb-2 text-lg font-bold text-heading">{title}</Text>

      <Text
        numberOfLines={expanded ? undefined : 3}
        className="text-sm leading-5 text-slate-500"
      >
        {body}
      </Text>

      {!expanded ? (
        <Pressable
          onPress={onExpand}
          accessibilityRole="button"
          className="mt-1 self-start active:opacity-[0.92]"
        >
          <Text className="text-sm font-medium text-primary">Read more</Text>
        </Pressable>
      ) : null}
    </>
  );
}
