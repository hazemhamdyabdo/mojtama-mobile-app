import { colors } from "@/theme/colors";
import MemberRow from "@/features/home/components/members/MemberRow";
import type { Member } from "@/features/home/types";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
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
import { I18nManager, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MembersBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type MembersBottomSheetProps = {
  title: string;
  searchPlaceholder: string;
  members: Member[];
  selectedIds: string[];
  multiSelect?: boolean;
  onSelect: (member: Member) => void;
};

const MembersBottomSheet = forwardRef<
  MembersBottomSheetRef,
  MembersBottomSheetProps
>(function MembersBottomSheet(
  { title, searchPlaceholder, members, selectedIds, multiSelect = false, onSelect },
  ref,
) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const textAlign = I18nManager.isRTL ? "right" : "left";
  const snapPoints = useMemo(() => ["65%"], []);
  const [searchQuery, setSearchQuery] = useState("");

  useImperativeHandle(ref, () => ({
    open: () => {
      setSearchQuery("");
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

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return members;
    }

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query),
    );
  }, [members, searchQuery]);

  const handleSelect = (member: Member) => {
    onSelect(member);

    if (!multiSelect) {
      bottomSheetRef.current?.dismiss();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.heading, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: colors.white,
      }}
    >
      <View className="px-4 pb-3">
        <Text className="mb-4 text-center text-base font-bold text-heading">
          {title}
        </Text>

        <View className="flex-row items-center rounded-full border border-card-border bg-white px-4">
          <MaterialDesignIcons name="magnify" color={colors.secText} size={20} />
          <BottomSheetTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.secText}
            autoCapitalize="none"
            style={{
              flex: 1,
              textAlign,
              minHeight: 44,
              paddingVertical: 10,
              paddingHorizontal: 8,
              fontSize: 15,
              color: colors.heading,
            }}
          />
        </View>
      </View>

      <BottomSheetFlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
        renderItem={({ item }) => (
          <MemberRow
            member={item}
            selected={selectedIds.includes(item.id)}
            highlightSelected={!multiSelect}
            onPress={() => handleSelect(item)}
          />
        )}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-sm text-sec-text">
            {t("home.members.empty")}
          </Text>
        }
      />
    </BottomSheetModal>
  );
});

export default MembersBottomSheet;
