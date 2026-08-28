import type { Visitor } from "@/features/visitors/types";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type VisitorDetailsInfoGridProps = {
  visitor: Visitor;
};

type InfoCellProps = {
  label: string;
  value: string;
};

function InfoCell({ label, value }: InfoCellProps) {
  return (
    <View className="mb-4 flex-1">
      <Text className="text-sm text-sec-text">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-heading">{value}</Text>
    </View>
  );
}

export default function VisitorDetailsInfoGrid({
  visitor,
}: VisitorDetailsInfoGridProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View className="flex-row gap-3">
        <InfoCell label={t("visitors.details.visiting")} value={visitor.hostName} />
        <InfoCell label={t("visitors.details.location")} value={visitor.location} />
      </View>
      <View className="flex-row gap-3">
        <InfoCell
          label={t("visitors.card.dateTime")}
          value={t("visitors.card.dateTimeAt", {
            date: visitor.date,
            time: visitor.time,
          })}
        />
        <InfoCell label={t("visitors.card.purpose")} value={visitor.purpose} />
      </View>
      <View className="flex-row gap-3">
        <InfoCell label={t("visitors.details.duration")} value={visitor.duration} />
        <InfoCell
          label={t("visitors.details.parkingSpot")}
          value={visitor.parkingSpot}
        />
      </View>
    </View>
  );
}
