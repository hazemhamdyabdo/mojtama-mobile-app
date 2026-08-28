import { colors } from "@/theme/colors";
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
      className="mb-6 rounded-2xl border border-card-border bg-white px-4 py-4 active:opacity-[0.92]"
    >
      <View className="flex-row items-start">
        <Image
          source={profile.avatar}
          contentFit="cover"
          style={{ width: 56, height: 56, borderRadius: 100 }}
        />

        <View className="ml-3 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-lg font-bold text-heading">
              {profile.name}
            </Text>
            <View className="rounded-full bg-approved-50 px-2.5 py-0.5">
              <Text className="text-xs font-medium text-approved-500">
                {profile.status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-sm font-medium text-slate-500">Units</Text>

          <View className="mt-2 flex-row flex-wrap gap-2">
            {profile.units.map((unit) => (
              <View
                key={unit.id}
                className="rounded-lg bg-slate-100 px-3 py-1.5"
              >
                <Text className="text-xs font-medium text-slate-500">
                  {unit.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <MaterialDesignIcons name="chevron-right" color={colors.secText} size={22} />
      </View>
    </Pressable>
  );
}
