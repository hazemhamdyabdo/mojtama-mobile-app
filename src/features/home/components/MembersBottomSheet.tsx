import type { Member } from "@/features/home/types";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type MemberRowProps = {
  member: Member;
  selected: boolean;
  highlightSelected: boolean;
  onPress: () => void;
};

function MemberRow({
  member,
  selected,
  highlightSelected,
  onPress,
}: MemberRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={`mb-2 flex-row items-center rounded-2xl border p-3 active:opacity-[0.92] ${
        selected && highlightSelected
          ? "border-[#7B61FF] bg-white"
          : "border-transparent"
      }`}
    >
      {member.avatar ? (
        <Image
          source={member.avatar}
          contentFit="cover"
          style={{ width: 48, height: 48, borderRadius: 100 }}
        />
      ) : (
        <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
          <Text className="text-base font-semibold text-[#7B61FF]">
            {getInitials(member.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-[#1F1F1F]">
          {member.name}
        </Text>
        <Text className="mt-0.5 text-sm text-[#90A1B9]">{member.role}</Text>
      </View>

      {selected ? (
        <View className="size-7 items-center justify-center rounded-full bg-[#7B61FF]">
          <MaterialDesignIcons name="check-bold" color="#FFFFFF" size={16} />
        </View>
      ) : (
        <View className="size-7 rounded-full border-2 border-[#E4E4E7]" />
      )}
    </Pressable>
  );
}

const MembersBottomSheet = forwardRef<
  MembersBottomSheetRef,
  MembersBottomSheetProps
>(function MembersBottomSheet(
  { title, searchPlaceholder, members, selectedIds, multiSelect = false, onSelect },
  ref,
) {
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
      handleIndicatorStyle={{ backgroundColor: "#1F1F1F", width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View className="px-4 pb-3">
        <Text className="mb-4 text-center text-base font-bold text-[#1F1F1F]">
          {title}
        </Text>

        <View className="flex-row items-center rounded-full border border-[#E4E4E7] bg-white px-4">
          <MaterialDesignIcons name="magnify" color="#90A1B9" size={20} />
          <BottomSheetTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor="#90A1B9"
            autoCapitalize="none"
            style={{
              flex: 1,
              textAlign,
              minHeight: 44,
              paddingVertical: 10,
              paddingHorizontal: 8,
              fontSize: 15,
              color: "#1F1F1F",
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
          <Text className="mt-8 text-center text-sm text-[#90A1B9]">
            No members found
          </Text>
        }
      />
    </BottomSheetModal>
  );
});

export default MembersBottomSheet;
