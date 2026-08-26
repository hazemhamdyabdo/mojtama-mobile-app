import RequestPriorityBadge from "@/features/requests/components/RequestPriorityBadge";
import RequestTypeBadge from "@/features/requests/components/RequestTypeBadge";
import type { ServiceRequest } from "@/features/requests/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type ManagerRequestCardProps = {
  request: ServiceRequest;
  onPress: (requestId: string) => void;
};

export default function ManagerRequestCard({
  request,
  onPress,
}: ManagerRequestCardProps) {
  return (
    <Pressable
      onPress={() => onPress(request.id)}
      accessibilityRole="button"
      className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white p-4 active:opacity-[0.92]"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="size-2 rounded-full bg-[#7B61FF]" />
          <Text className="text-sm text-[#64748B]">{request.date}</Text>
        </View>
        <RequestTypeBadge requestType={request.requestType} />
      </View>

      <Text className="mt-3 text-base font-bold text-[#1F1F1F]">
        {request.title}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-[#64748B]" numberOfLines={2}>
        {request.description}
      </Text>

      <View className="mt-4 flex-row items-center rounded-2xl bg-[#F8FAFC] px-3 py-3">
        {request.submittedBy.avatar ? (
          <Image
            source={request.submittedBy.avatar}
            contentFit="cover"
            style={{ width: 32, height: 32, borderRadius: 100 }}
          />
        ) : (
          <View className="size-8 items-center justify-center rounded-full bg-[#F0EDFF]">
            <Text className="text-xs font-semibold text-[#7B61FF]">
              {request.submittedBy.name.charAt(0)}
            </Text>
          </View>
        )}

        <View className="ml-2 flex-1">
          <Text className="text-sm font-semibold text-[#1F1F1F]">
            {request.submittedBy.name}
          </Text>
          <View className="flex-row items-center gap-0.5">
            <MaterialDesignIcons
              name="map-marker-outline"
              color="#7B61FF"
              size={12}
            />
            <Text className="text-xs text-[#7B61FF]">{request.location}</Text>
          </View>
        </View>

        <RequestPriorityBadge priority={request.priority} />
      </View>
    </Pressable>
  );
}
