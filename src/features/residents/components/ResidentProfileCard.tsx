import ResidentStatusBadge from "@/features/residents/components/ResidentStatusBadge";
import type { Resident } from "@/features/residents/types";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type ResidentProfileCardProps = {
  resident: Resident;
};

function ContactCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-slate-50 px-3 py-3">
      <Text className="text-xs text-slate-500">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-heading">{value}</Text>
    </View>
  );
}

export default function ResidentProfileCard({ resident }: ResidentProfileCardProps) {
  const units = resident.units ?? [
    { id: "default", label: `${resident.unit} · ${resident.building}` },
  ];

  return (
    <View className="mb-6 rounded-2xl border border-card-border bg-slate-50 px-4 py-5">
      <View className="items-center">
        {resident.avatar ? (
          <Image
            source={resident.avatar}
            contentFit="cover"
            style={{ width: 72, height: 72, borderRadius: 100 }}
          />
        ) : (
          <View className="size-[72px] items-center justify-center rounded-full bg-primary-50">
            <Text className="text-xl font-bold text-primary">
              {resident.initials}
            </Text>
          </View>
        )}

        <View className="mt-4 flex-row flex-wrap items-center justify-center gap-2">
          <Text className="text-lg font-bold text-heading">{resident.name}</Text>
          <ResidentStatusBadge role={resident.role} />
        </View>
      </View>

      <View className="mt-5">
        <Text className="mb-2 text-sm font-medium text-slate-500">Units</Text>
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

      {resident.phone && resident.email ? (
        <View className="mt-4 flex-row gap-3">
          <ContactCard label="Phone number" value={resident.phone} />
          <ContactCard label="Email Address" value={resident.email} />
        </View>
      ) : null}
    </View>
  );
}
