import { colors } from "@/theme/colors";
import type { Member } from "@/features/home/types";
import { getInitials } from "@/utils/getInitials";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type MemberRowProps = {
  member: Member;
  selected: boolean;
  highlightSelected: boolean;
  onPress: () => void;
};

export default function MemberRow({
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
          ? "border-primary bg-white"
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
        <View className="size-12 items-center justify-center rounded-full bg-primary-50">
          <Text className="text-base font-semibold text-primary">
            {getInitials(member.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-heading">
          {member.name}
        </Text>
        <Text className="mt-0.5 text-sm text-sec-text">{member.role}</Text>
      </View>

      {selected ? (
        <View className="size-7 items-center justify-center rounded-full bg-primary">
          <MaterialDesignIcons name="check-bold" color={colors.white} size={16} />
        </View>
      ) : (
        <View className="size-7 rounded-full border-2 border-card-border" />
      )}
    </Pressable>
  );
}
