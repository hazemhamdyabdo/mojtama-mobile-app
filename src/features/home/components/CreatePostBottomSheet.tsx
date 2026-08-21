import { POST_TYPE_OPTIONS } from "@/features/home/constants/postTypes";
import type { PostType } from "@/features/home/types";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type CreatePostBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type CreatePostBottomSheetProps = {
  onSelectPostType?: (type: PostType) => void;
};

const CreatePostBottomSheet = forwardRef<
  CreatePostBottomSheetRef,
  CreatePostBottomSheetProps
>(function CreatePostBottomSheet({ onSelectPostType }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

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

  const handleClose = () => {
    bottomSheetRef.current?.dismiss();
  };

  const handleSelectPostType = (type: PostType) => {
    onSelectPostType?.(type);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={["110%"]}
      topInset={insets.top}
      enablePanDownToClose
      handleComponent={null}
      backgroundStyle={{
        backgroundColor: "#fff",
      }}
    >
      <BottomSheetView
        className="flex-1 px-4"
        style={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          height: "100%",
        }}
      >
        <View className="relative mb-6 flex-row items-center justify-center">
          <Pressable
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            className="absolute left-0 active:opacity-[0.92]"
          >
            <View className="size-10 items-center justify-center rounded-full bg-[#F0EDFF]">
              <MaterialDesignIcons
                name="chevron-left"
                color="#7B61FF"
                size={24}
              />
            </View>
          </Pressable>

          <Text className="text-lg font-bold text-[#1F1F1F]">
            Create New Post
          </Text>
        </View>

        {POST_TYPE_OPTIONS.map((option) => (
          <Pressable
            key={option.id}
            onPress={() => handleSelectPostType(option.id)}
            accessibilityRole="button"
            className="mb-3 flex-row items-center rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
          >
            <View className="mr-4  items-center justify-center rounded-full bg-[#F0EDFF]">
              <Image
                source={option.icon}
                contentFit="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>

            <View className="flex-1">
              <Text className="text-base font-bold text-[#1F1F1F]">
                {option.title}
              </Text>
              <Text className="mt-1 text-sm leading-5 text-[#90A1B9]">
                {option.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CreatePostBottomSheet;
