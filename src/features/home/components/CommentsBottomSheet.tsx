import { DUMMY_COMMENTS } from "@/features/home/constants/dummy";
import type { PostComment } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type CommentsBottomSheetRef = {
  open: (postId: string) => void;
  close: () => void;
};

type CommentsBottomSheetProps = {
  comments?: PostComment[];
  onSendComment?: (postId: string, text: string) => void;
};

type CommentItemProps = {
  comment: PostComment;
  isReply?: boolean;
};

function CommentItem({ comment, isReply = false }: CommentItemProps) {
  return (
    <View className={isReply ? "ml-6 border-l border-[#E4E4E7] pl-4" : ""}>
      <View className="mb-4">
        <View className="flex-row items-center gap-2">
          {comment.avatar ? (
            <Image
              source={comment.avatar}
              contentFit="cover"
              style={{ width: 32, height: 32, borderRadius: 100 }}
            />
          ) : (
            <View className="size-8 items-center justify-center rounded-full bg-[#F0EDFF]">
              <Text className="text-xs font-semibold text-[#7B61FF]">
                {comment.authorName[0]}
              </Text>
            </View>
          )}

          <Text className="text-base font-semibold text-[#1F1F1F]">
            {comment.authorName}
          </Text>
          <Text className="text-sm text-[#90A1B9]">{comment.time}</Text>
        </View>

        <View className="ml-10">
          <Text className="text-sm leading-5 text-[#64748B]">
            {comment.text}
            <Text className="text-sm font-medium text-[#7B61FF]">
              {" "}
              View more...
            </Text>
          </Text>

          <View className="mt-2 flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <MaterialDesignIcons
                name="thumb-up-outline"
                color="#90A1B9"
                size={16}
              />
              <Text className="text-sm text-[#90A1B9]">
                {comment.likesCount.toLocaleString()} Likes
              </Text>
            </View>

            {!isReply ? (
              <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-1 active:opacity-[0.92]"
              >
                <MaterialDesignIcons
                  name="arrow-right-top"
                  color="#7B61FF"
                  size={16}
                />
                <Text className="text-sm font-medium text-[#7B61FF]">
                  Reply
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </View>
  );
}

const CommentsBottomSheet = forwardRef<
  CommentsBottomSheetRef,
  CommentsBottomSheetProps
>(function CommentsBottomSheet(
  { comments = DUMMY_COMMENTS, onSendComment },
  ref,
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const snapPoints = useMemo(() => ["75%"], []);

  useImperativeHandle(ref, () => ({
    open: (postId: string) => {
      setActivePostId(postId);
      setCommentText("");
      bottomSheetRef.current?.present();
    },
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

  const handleSend = () => {
    const text = commentText.trim();

    if (!text || !activePostId) {
      return;
    }

    onSendComment?.(activePostId, text);
    setCommentText("");
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View className="flex-1">
        <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
          Comments
        </Text>

        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        >
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </BottomSheetScrollView>

        <View
          className="flex-row items-center gap-3 border-t border-[#F1F5F9] px-4 pt-3"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <BottomSheetTextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write your comments"
            placeholderTextColor="#90A1B9"
            className="flex-1 rounded-xl bg-[#F8FAFC] px-4 py-3 text-base text-[#1F1F1F]"
            style={{ minHeight: 48 }}
          />

          <Pressable
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="Send comment"
            className="size-12 items-center justify-center rounded-full bg-[#F0EDFF] active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="send-outline" color="#7B61FF" size={22} />
          </Pressable>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default CommentsBottomSheet;
