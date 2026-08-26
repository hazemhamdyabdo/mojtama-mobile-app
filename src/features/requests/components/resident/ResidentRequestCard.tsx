import RequestPriorityBadge from "@/features/requests/components/RequestPriorityBadge";
import RequestTypeBadge from "@/features/requests/components/RequestTypeBadge";
import type { ServiceRequest } from "@/features/requests/types";
import { Pressable, Text, View } from "react-native";

type ResidentRequestCardProps = {
  request: ServiceRequest;
  onPress: (requestId: string) => void;
};

export default function ResidentRequestCard({
  request,
  onPress,
}: ResidentRequestCardProps) {
  return (
    <Pressable
      onPress={() => onPress(request.id)}
      accessibilityRole="button"
      className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
    >
      <View className="flex-row items-center gap-2">
        <View className="size-2 rounded-full bg-[#7B61FF]" />
        <Text className="text-sm text-[#64748B]">{request.date}</Text>
      </View>

      <Text className="mt-3 text-base font-bold text-[#1F1F1F]">
        {request.title}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-[#64748B]" numberOfLines={2}>
        {request.description}
      </Text>

      <View className="mt-4 flex-row items-center  justify-start gap-2">
        <RequestPriorityBadge priority={request.priority} />
        <RequestTypeBadge requestType={request.requestType} />
      </View>
    </Pressable>
  );
}
