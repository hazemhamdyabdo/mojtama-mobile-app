import type { ProfileUnit } from "@/features/profile/types";
import { Text, View } from "react-native";

type ProfileUnitsSectionProps = {
  units: ProfileUnit[];
};

export default function ProfileUnitsSection({ units }: ProfileUnitsSectionProps) {
  return (
    <View className="mt-4 w-full">
      <Text className="mb-2 text-sm font-medium text-[#64748B]">Units</Text>
      <View className="flex-row flex-wrap gap-2">
        {units.map((unit) => (
          <View
            key={unit.id}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5"
          >
            <Text className="text-xs font-medium text-[#64748B]">
              {unit.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
