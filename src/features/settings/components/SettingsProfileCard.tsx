import type { SettingsProfile } from "@/features/settings/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type SettingsProfileCardProps = {
  profile: SettingsProfile;
  onPress?: () => void;
};

export default function SettingsProfileCard({
  profile,
  onPress,
}: SettingsProfileCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="mb-6 rounded-2xl border border-[#E4E4E7] bg-white px-4 py-4 active:opacity-[0.92]"
    >
      <View className="flex-row items-start">
        <Image
          source={profile.avatar}
          contentFit="cover"
          style={{ width: 56, height: 56, borderRadius: 100 }}
        />

        <View className="ml-3 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-lg font-bold text-[#1F1F1F]">
              {profile.name}
            </Text>
            <View className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5">
              <Text className="text-xs font-medium text-[#22C55E]">
                {profile.status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-sm font-medium text-[#64748B]">Units</Text>

          <View className="mt-2 flex-row flex-wrap gap-2">
            {profile.units.map((unit) => (
              <View
                key={unit.id}
                className="rounded-lg bg-[#F1F5F9] px-3 py-1.5"
              >
                <Text className="text-xs font-medium text-[#64748B]">
                  {unit.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <MaterialDesignIcons name="chevron-right" color="#90A1B9" size={22} />
      </View>
    </Pressable>
  );
}
