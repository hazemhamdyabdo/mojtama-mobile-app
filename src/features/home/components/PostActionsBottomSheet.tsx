import BottomSheetMenuActionRow from "@/components/ui/BottomSheetMenuActionRow";
import { colors } from "@/theme/colors";
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
} from "react";
import { useTranslation } from "react-i18next";
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

const PostActionsBottomSheet = forwardRef<
  PostActionsBottomSheetRef,
  PostActionsBottomSheetProps
>(function PostActionsBottomSheet(
  { onMoveToDraft, onEditPost, onMarkAsUrgent, onDeletePost },
  ref,
) {
  const { t } = useTranslation();
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
      handleIndicatorStyle={{ backgroundColor: colors.heading, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: colors.white,
      }}
    >
      <BottomSheetView
        className="px-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <BottomSheetMenuActionRow
          label={t("home.postActions.moveToDraft")}
          onPress={() => runAction(onMoveToDraft)}
        />
        <BottomSheetMenuActionRow
          label={t("home.postActions.editPost")}
          onPress={() => runAction(onEditPost)}
        />

        <View className="flex-row items-center justify-between border-b border-slate-100 px-1 py-4">
          <Text className="text-base text-heading font-semibold">
            {t("home.postActions.markAsUrgent")}
          </Text>
          <Switch
            value={isUrgent}
            onValueChange={handleMarkAsUrgentChange}
            trackColor={{ false: colors.primary100, true: colors.primary300 }}
            thumbColor={isUrgent ? colors.primary : colors.white}
          />
        </View>

        <Pressable
          onPress={() => runAction(onDeletePost)}
          accessibilityRole="button"
          className="border-b border-slate-100 px-1 py-4 active:opacity-[0.92]"
        >
          <Text className="text-base text-rejected-500 font-semibold">
            {t("home.postActions.deletePost")}
          </Text>
        </Pressable>

        <Pressable
          onPress={closeSheet}
          accessibilityRole="button"
          className="items-center py-5 active:opacity-[0.92]"
        >
          <Text className="text-base font-bold text-heading">
            {t("common.cancel")}
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PostActionsBottomSheet;
