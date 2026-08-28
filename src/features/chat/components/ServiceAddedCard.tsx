import { colors } from "@/theme/colors";
import AiAvatar from "@/features/chat/components/AiAvatar";
import { SERVICE_ADDED_DETAILS } from "@/features/chat/constants/suggestions";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Text, View } from "react-native";

type ServiceAddedCardProps = {
  serviceName: string;
  time: string;
};

export default function ServiceAddedCard({
  serviceName,
  time,
}: ServiceAddedCardProps) {
  return (
    <View className="mb-4 max-w-[92%] flex-row items-start gap-2 self-start">
      <AiAvatar size={32} />
      <View className="flex-1 rounded-2xl rounded-bl-md border border-card-border bg-white px-4 py-3">
        <View className="flex-row items-center gap-2">
          <Text className="flex-1 text-sm font-semibold text-heading">
            Service Added Successfully
          </Text>
          <View className="size-6 items-center justify-center rounded-full bg-primary">
            <MaterialDesignIcons name="check-bold" color={colors.white} size={14} />
          </View>
        </View>

        <Text className="mt-2 text-sm leading-5 text-slate-500">
          {serviceName} has been add to your service.
        </Text>

        <View className="my-3 h-px bg-slate-200" />

        <View className="gap-1.5">
          <Text className="text-sm text-slate-500">
            Price: {SERVICE_ADDED_DETAILS.price}
          </Text>
          <Text className="text-sm text-slate-500">
            Duration: {SERVICE_ADDED_DETAILS.duration}
          </Text>
          <Text className="text-sm text-slate-500">
            Added on: {SERVICE_ADDED_DETAILS.addedOn}
          </Text>
        </View>

        <Text className="mt-2 self-end text-xs text-sec-text">{time}</Text>
      </View>
    </View>
  );
}
