import type { Visitor } from "@/features/visitors/types";
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
  return (
    <View>
      <View className="flex-row gap-3">
        <InfoCell label="Visiting" value={visitor.hostName} />
        <InfoCell label="location" value={visitor.location} />
      </View>
      <View className="flex-row gap-3">
        <InfoCell
          label="Date & time"
          value={`${visitor.date}  at  ${visitor.time}`}
        />
        <InfoCell label="Purpose" value={visitor.purpose} />
      </View>
      <View className="flex-row gap-3">
        <InfoCell label="Duration" value={visitor.duration} />
        <InfoCell label="Parking spot" value={visitor.parkingSpot} />
      </View>
    </View>
  );
}
