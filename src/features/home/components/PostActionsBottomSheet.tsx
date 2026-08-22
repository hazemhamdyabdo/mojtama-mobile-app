import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type PostActionsBottomSheetRef = {
  open: (postId: string) => void;
  close: () => void;
};

type PostActionsBottomSheetProps = {
  onMoveToDraft?: (postId: string) => void;
  onEditPost?: (postId: string) => void;
  onMarkAsUrgent?: (postId: string, isUrgent: boolean) => void;
  onDeletePost?: (postId: string) => void;
};

type ActionRowProps = {
  label: string;
  onPress?: () => void;
  labelClassName?: string;
  rightElement?: ReactNode;
};

function ActionRow({
  label,
  onPress,
  labelClassName = "text-base text-[#1F1F1F] font-semibold",
  rightElement,
}: ActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      className="flex-row items-center  justify-between border-b border-[#F1F5F9] px-1 py-4 active:opacity-[0.92]"
    >
      <Text className={labelClassName}>{label}</Text>
      {rightElement}
    </Pressable>
  );
}

const PostActionsBottomSheet = forwardRef<
  PostActionsBottomSheetRef,
  PostActionsBottomSheetProps
>(function PostActionsBottomSheet(
  { onMoveToDraft, onEditPost, onMarkAsUrgent, onDeletePost },
  ref,
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);

  const snapPoints = useMemo(() => ["42%"], []);

  useImperativeHandle(ref, () => ({
    open: (postId: string) => {
      setActivePostId(postId);
      setIsUrgent(false);
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

  const closeSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const runAction = (action?: (postId: string) => void) => {
    if (!activePostId || !action) {
      return;
    }

    action(activePostId);
    closeSheet();
  };

  const handleMarkAsUrgentChange = (value: boolean) => {
    setIsUrgent(value);

    if (activePostId) {
      onMarkAsUrgent?.(activePostId, value);
    }
  };

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
      <BottomSheetView
        className="px-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <ActionRow
          label="Move To Draft"
          onPress={() => runAction(onMoveToDraft)}
        />
        <ActionRow label="Edit Post" onPress={() => runAction(onEditPost)} />

        <View className="flex-row items-center justify-between border-b border-[#F1F5F9] px-1 py-4">
          <Text className="text-base text-[#1F1F1F] font-semibold">
            Mark As Urgent
          </Text>
          <Switch
            value={isUrgent}
            onValueChange={handleMarkAsUrgentChange}
            trackColor={{ false: "#E9E4FF", true: "#C4B5FD" }}
            thumbColor={isUrgent ? "#7B61FF" : "#FFFFFF"}
          />
        </View>

        <Pressable
          onPress={() => runAction(onDeletePost)}
          accessibilityRole="button"
          className="border-b border-[#F1F5F9] px-1 py-4 active:opacity-[0.92]"
        >
          <Text className="text-base text-[#F87171] font-semibold">
            Delete Post
          </Text>
        </Pressable>

        <Pressable
          onPress={closeSheet}
          accessibilityRole="button"
          className="items-center py-5 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-[#1F1F1F]">Cancel</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PostActionsBottomSheet;
