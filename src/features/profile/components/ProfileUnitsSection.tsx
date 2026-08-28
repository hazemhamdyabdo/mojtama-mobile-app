import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type ProfileUnitsSectionProps = {
  units: { id: string; label: string }[];
};

export default function ProfileUnitsSection({ units }: ProfileUnitsSectionProps) {
  const { t } = useTranslation();

  return (
    <View className="mt-4 w-full">
      <Text className="mb-2 text-sm font-medium text-slate-500">
        {t("common.units")}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {units.map((unit) => (
          <View
            key={unit.id}
            className="rounded-lg border border-card-border bg-white px-3 py-1.5"
          >
            <Text className="text-xs font-medium text-slate-500">
              {unit.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
