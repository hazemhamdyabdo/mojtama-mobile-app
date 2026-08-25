import AdminResponseCard from "@/features/profile/components/AdminResponseCard";
import SupportRequestCategoryBadge from "@/features/profile/components/SupportRequestCategoryBadge";
import SupportRequestUrgencyBadge from "@/features/profile/components/SupportRequestUrgencyBadge";
import type { SupportRequest } from "@/features/profile/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type SupportRequestCardProps = {
  request: SupportRequest;
};

export default function SupportRequestCard({ request }: SupportRequestCardProps) {
  return (
    <View className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="size-2 rounded-full bg-[#7B61FF]" />
          <Text className="text-sm text-[#64748B]">{request.date}</Text>
        </View>
        <SupportRequestCategoryBadge category={request.category} />
      </View>

      <Text className="mt-3 text-base font-bold text-[#1F1F1F]">
        {request.title}
      </Text>
      <Text className="mt-2 text-sm leading-5 text-[#64748B]">
        {request.description}
      </Text>

      <View className="mt-4 flex-row items-center">
        {request.reporter.avatar ? (
          <Image
            source={request.reporter.avatar}
            contentFit="cover"
            style={{ width: 32, height: 32, borderRadius: 100 }}
          />
        ) : (
          <View className="size-8 items-center justify-center rounded-full bg-[#F0EDFF]">
            <Text className="text-xs font-semibold text-[#7B61FF]">
              {request.reporter.name.charAt(0)}
            </Text>
          </View>
        )}

        <View className="ml-2 flex-1">
          <Text className="text-sm font-semibold text-[#1F1F1F]">
            {request.reporter.name}
          </Text>
          <View className="flex-row items-center gap-0.5">
            <MaterialDesignIcons
              name="map-marker-outline"
              color="#7B61FF"
              size={12}
            />
            <Text className="text-xs text-[#7B61FF]">
              {request.reporter.unit}
            </Text>
          </View>
        </View>

        <SupportRequestUrgencyBadge urgency={request.urgency} />
      </View>

      {request.adminResponse ? (
        <AdminResponseCard response={request.adminResponse} />
      ) : null}
    </View>
  );
}
