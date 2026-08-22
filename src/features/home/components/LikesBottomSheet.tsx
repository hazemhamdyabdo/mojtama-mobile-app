import { DUMMY_LIKES } from "@/features/home/constants/dummy";
import type { PostLike } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentProps,
} from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type LikesBottomSheetRef = {
  open: (postId: string) => void;
  close: () => void;
};

type LikesBottomSheetProps = {
  likes?: PostLike[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function LikeRow({ like }: { like: PostLike }) {
  return (
    <View className="mb-5 flex-row items-center">
      {like.avatar ? (
        <Image
          source={like.avatar}
          contentFit="cover"
          style={{ width: 48, height: 48, borderRadius: 100 }}
        />
      ) : (
        <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
          <Text className="text-base font-semibold text-[#7B61FF]">
            {getInitials(like.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-semibold text-[#1F1F1F]">
            {like.name}
          </Text>
          <View className="flex-row items-center gap-0.5">
            <MaterialDesignIcons
              name="map-marker-outline"
              color="#7B61FF"
              size={14}
            />
            <Text className="text-xs font-medium text-[#7B61FF]">
              {like.unit}
            </Text>
          </View>
        </View>
        <Text className="mt-0.5 text-sm text-[#90A1B9]">{like.time}</Text>
      </View>
    </View>
  );
}

const LikesBottomSheet = forwardRef<LikesBottomSheetRef, LikesBottomSheetProps>(
  function LikesBottomSheet({ likes = DUMMY_LIKES }, ref) {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ["70%"], []);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.present(),
      close: () => bottomSheetRef.current?.dismiss(),
    }));

    const renderBackdrop = useCallback(
      (props: ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "#FFFFFF",
        }}
      >
        <BottomSheetFlatList
          data={likes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 16,
          }}
          ListHeaderComponent={
            <Text className="mb-5 text-center text-base font-bold text-[#1F1F1F]">
              likes
            </Text>
          }
          renderItem={({ item }) => <LikeRow like={item} />}
        />
      </BottomSheetModal>
    );
  },
);

export default LikesBottomSheet;
