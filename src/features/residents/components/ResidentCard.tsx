import ResidentStatusBadge from "@/features/residents/components/ResidentStatusBadge";
import type { Resident } from "@/features/residents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { colors } from "@/theme/colors";

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
      className="mb-3 flex-row items-center gap-3 rounded-2xl border border-card-border bg-white p-4 active:opacity-[0.92]"
    >
      {resident.avatar ? (
        <Image
          source={resident.avatar}
          contentFit="cover"
          style={{ width: 48, height: 48, borderRadius: 100 }}
        />
      ) : (
        <View className="size-12 items-center justify-center rounded-full bg-primary-50">
          <Text className="text-sm font-bold text-primary">
            {resident.initials}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Text className="text-base font-bold text-heading">
            {resident.name}
          </Text>
          <ResidentStatusBadge role={resident.role} />
        </View>

        <View className="mt-2 flex-row items-center gap-1.5">
          <View className="rounded-md bg-slate-100 px-2 py-0.5">
            <Text className="text-xs font-medium text-slate-500">
              {resident.unit}
            </Text>
          </View>
          <Text className="text-xs text-slate-500">•</Text>
          <Text className="text-xs text-slate-500">{resident.building}</Text>
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
          color={colors.slate500}
          size={20}
        />
      </Pressable>
    </Pressable>
  );
}
