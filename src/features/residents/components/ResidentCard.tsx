import ResidentStatusBadge from "@/features/residents/components/ResidentStatusBadge";
import type { Resident } from "@/features/residents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type ResidentCardProps = {
  resident: Resident;
  onPress: (residentId: string) => void;
  onMenuPress: (residentId: string) => void;
};

export default function ResidentCard({
  resident,
  onPress,
  onMenuPress,
}: ResidentCardProps) {
  return (
    <Pressable
      onPress={() => onPress(resident.id)}
      accessibilityRole="button"
      className="mb-3 flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
    >
      {resident.avatar ? (
        <Image
          source={resident.avatar}
          contentFit="cover"
          style={{ width: 48, height: 48, borderRadius: 100 }}
        />
      ) : (
        <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
          <Text className="text-sm font-bold text-[#7B61FF]">
            {resident.initials}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="text-base font-bold text-[#1F1F1F]">
            {resident.name}
          </Text>
          <ResidentStatusBadge role={resident.role} />
        </View>

        <View className="mt-2 flex-row items-center gap-1.5">
          <View className="rounded-md bg-[#F1F5F9] px-2 py-0.5">
            <Text className="text-xs font-medium text-[#64748B]">
              {resident.unit}
            </Text>
          </View>
          <Text className="text-xs text-[#64748B]">•</Text>
          <Text className="text-xs text-[#64748B]">{resident.building}</Text>
        </View>
      </View>

      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          onMenuPress(resident.id);
        }}
        accessibilityRole="button"
        accessibilityLabel={`Actions for ${resident.name}`}
        hitSlop={8}
        className="active:opacity-[0.92]"
      >
        <MaterialDesignIcons
          name="dots-vertical"
          color="#64748B"
          size={20}
        />
      </Pressable>
    </Pressable>
  );
}
