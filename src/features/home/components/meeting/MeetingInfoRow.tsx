import { Text, View } from "react-native";

type MeetingInfoRowProps = {
  label: string;
  value: string;
  accent?: string;
};

export default function MeetingInfoRow({
  label,
  value,
  accent,
}: MeetingInfoRowProps) {
  return (
    <View className="flex-row items-start justify-between px-4 py-2.5">
      <Text className="text-base text-slate-500">{label}</Text>
      <View className="max-w-[58%] flex-row flex-wrap items-center justify-end gap-1">
        <Text className="text-right text-base font-normal text-heading">
          {value}
        </Text>
        {accent ? (
          <Text className="text-base font-normal text-primary">({accent})</Text>
        ) : null}
      </View>
    </View>
  );
}
