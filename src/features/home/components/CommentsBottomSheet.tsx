import { colors } from "@/theme/colors";
import CommentItem from "@/features/home/components/comments/CommentItem";
import { DUMMY_COMMENTS } from "@/features/home/constants/dummy";
import type { PostComment } from "@/features/home/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
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
      handleIndicatorStyle={{ backgroundColor: colors.heading, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: colors.white,
      }}
    >
      <View className="flex-1">
        <Text className="mb-4 text-center text-base font-bold text-heading">
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
          className="flex-row items-center gap-3 border-t border-slate-100 px-4 pt-3"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <BottomSheetTextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write your comments"
            placeholderTextColor={colors.secText}
            className="flex-1 rounded-xl bg-slate-50 px-4 py-3 text-base text-heading"
            style={{ minHeight: 48 }}
          />

          <Pressable
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="Send comment"
            className="size-12 items-center justify-center rounded-full bg-primary-50 active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="send-outline" color={colors.primary} size={22} />
          </Pressable>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default CommentsBottomSheet;
