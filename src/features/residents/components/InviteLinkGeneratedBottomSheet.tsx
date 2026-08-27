import {
  DEFAULT_INVITE_LINK,
  INVITE_LINK_EXPIRES_AT,
} from "@/features/residents/constants/dummy";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type InviteLinkGeneratedBottomSheetRef = {
  open: () => void;
  close: () => void;
};

function generateInviteLink(): string {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `https://communityapp.com/invite/${suffix}`;
}

const InviteLinkGeneratedBottomSheet = forwardRef<
  InviteLinkGeneratedBottomSheetRef,
  object
>(function InviteLinkGeneratedBottomSheet(_props, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [inviteLink, setInviteLink] = useState(DEFAULT_INVITE_LINK);
  const [showCopied, setShowCopied] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setInviteLink(generateInviteLink());
      setShowCopied(false);
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

  const handleCopyLink = () => {
    setShowCopied(true);
  };

  const handleRegenerateLink = () => {
    setInviteLink(generateInviteLink());
    setShowCopied(false);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
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
        style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <Text className="text-center text-base font-bold text-[#1F1F1F]">
          Invite Link Generated
        </Text>
        <Text className="mt-2 text-center text-sm leading-5 text-[#64748B]">
          Share this link with resident to allow them to register in the
          community
        </Text>

        <Text className="mb-2 mt-5 text-sm font-semibold text-[#1F1F1F]">
          Invite Link
        </Text>

        <View className="flex-row items-center rounded-xl border border-[#E4E4E7] bg-white pl-4">
          <Text
            className="flex-1 py-3.5 text-sm text-[#64748B]"
            numberOfLines={1}
          >
            {inviteLink}
          </Text>
          <Pressable
            onPress={handleCopyLink}
            accessibilityRole="button"
            className="flex-row items-center gap-1 rounded-xl bg-[#7B61FF] px-3 py-3 active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="content-copy" color="#FFFFFF" size={16} />
            <Text className="text-xs font-bold text-white">Copy Link</Text>
          </Pressable>
        </View>

        {showCopied ? (
          <View className="mt-3 flex-row items-center justify-between rounded-xl bg-[#F0EDFF] px-4 py-3">
            <View className="flex-row items-center gap-2">
              <MaterialDesignIcons
                name="check-circle-outline"
                color="#7B61FF"
                size={18}
              />
              <Text className="text-sm font-medium text-[#7B61FF]">
                Link copied successfully
              </Text>
            </View>
            <Pressable
              onPress={() => setShowCopied(false)}
              accessibilityRole="button"
              hitSlop={8}
            >
              <MaterialDesignIcons name="close" color="#7B61FF" size={18} />
            </Pressable>
          </View>
        ) : null}

        <View className="mt-4 rounded-2xl bg-[#F0EDFF] p-4">
          <View className="flex-row items-start gap-3">
            <View className="size-10 items-center justify-center rounded-full bg-[#7B61FF]">
              <MaterialDesignIcons name="shield-check-outline" color="#FFFFFF" size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#1F1F1F]">
                Anyone with this link can register.
              </Text>
              <View className="mt-2 self-start rounded-full bg-[#E8E2FF] px-3 py-1">
                <Text className="text-xs font-medium text-[#7B61FF]">
                  Expire in 7 days · {INVITE_LINK_EXPIRES_AT}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleRegenerateLink}
          accessibilityRole="button"
          className="mt-4 flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
        >
          <View className="size-11 items-center justify-center rounded-full bg-[#F0EDFF]">
            <MaterialDesignIcons name="refresh" color="#7B61FF" size={22} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-[#1F1F1F]">
              Regenerate Link
            </Text>
            <Text className="mt-1 text-sm text-[#64748B]">
              Generate a new invite link
            </Text>
          </View>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default InviteLinkGeneratedBottomSheet;
