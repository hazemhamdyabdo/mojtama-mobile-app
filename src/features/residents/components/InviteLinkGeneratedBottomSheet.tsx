import { generateInvite } from "@/features/residents/api";
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
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export type InviteLinkGeneratedBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const InviteLinkGeneratedBottomSheet = forwardRef<
  InviteLinkGeneratedBottomSheetRef,
  object
>(function InviteLinkGeneratedBottomSheet(_props, ref) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [inviteLink, setInviteLink] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      void generateInvite().then(({ link, expiresAt: expiry }) => {
        setInviteLink(link);
        setExpiresAt(expiry);
        setShowCopied(false);
        bottomSheetRef.current?.present();
      });
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
    void generateInvite().then(({ link, expiresAt: expiry }) => {
      setInviteLink(link);
      setExpiresAt(expiry);
      setShowCopied(false);
    });
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
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
        style={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 16 }}
      >
        <Text className="text-center text-base font-bold text-heading">
          {t("residents.invite.sheetTitle")}
        </Text>
        <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
          Share this link with resident to allow them to register in the
          community
        </Text>

        <Text className="mb-2 mt-5 text-sm font-semibold text-heading">
          Invite Link
        </Text>

        <View className="flex-row items-center rounded-xl border border-card-border bg-white pl-4">
          <Text
            className="flex-1 py-3.5 text-sm text-slate-500"
            numberOfLines={1}
          >
            {inviteLink}
          </Text>
          <Pressable
            onPress={handleCopyLink}
            accessibilityRole="button"
            className="flex-row items-center gap-1 rounded-xl bg-primary px-3 py-3 active:opacity-[0.92]"
          >
            <MaterialDesignIcons name="content-copy" color={colors.white} size={16} />
            <Text className="text-xs font-bold text-white">
              {t("residents.invite.copyLink")}
            </Text>
          </Pressable>
        </View>

        {showCopied ? (
          <View className="mt-3 flex-row items-center justify-between rounded-xl bg-primary-50 px-4 py-3">
            <View className="flex-row items-center gap-2">
              <MaterialDesignIcons
                name="check-circle-outline"
                color={colors.primary}
                size={18}
              />
              <Text className="text-sm font-medium text-primary">
                {t("residents.invite.copied")}
              </Text>
            </View>
            <Pressable
              onPress={() => setShowCopied(false)}
              accessibilityRole="button"
              hitSlop={8}
            >
              <MaterialDesignIcons name="close" color={colors.primary} size={18} />
            </Pressable>
          </View>
        ) : null}

        <View className="mt-4 rounded-2xl bg-primary-50 p-4">
          <View className="flex-row items-start gap-3">
            <View className="size-10 items-center justify-center rounded-full bg-primary">
              <MaterialDesignIcons name="shield-check-outline" color={colors.white} size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-heading">
                Anyone with this link can register.
              </Text>
              <View className="mt-2 self-start rounded-full bg-primary-100 px-3 py-1">
                <Text className="text-xs font-medium text-primary">
                  Expire in 7 days · {expiresAt}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleRegenerateLink}
          accessibilityRole="button"
          className="mt-4 flex-row items-center gap-3 rounded-2xl border border-card-border bg-white p-4 active:opacity-[0.92]"
        >
          <View className="size-11 items-center justify-center rounded-full bg-primary-50">
            <MaterialDesignIcons name="refresh" color={colors.primary} size={22} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-heading">
              {t("residents.invite.regenerate")}
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Generate a new invite link
            </Text>
          </View>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default InviteLinkGeneratedBottomSheet;
