import { colors } from "@/theme/colors";
import AttendeeStatusBadge from "@/features/home/components/meeting/AttendeeStatusBadge";
import type { MeetingAttendee } from "@/features/home/types";
import { getInitials } from "@/utils/getInitials";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type AttendeeRowProps = {
  attendee: MeetingAttendee;
};

export default function AttendeeRow({ attendee }: AttendeeRowProps) {
  return (
    <View className="mb-4 flex-row items-center">
      {attendee.avatar ? (
        <Image
          source={attendee.avatar}
          contentFit="cover"
          style={{ width: 44, height: 44, borderRadius: 100 }}
        />
      ) : (
        <View className="size-11 items-center justify-center rounded-full bg-primary-50">
          <Text className="text-sm font-semibold text-primary">
            {getInitials(attendee.name)}
          </Text>
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-heading">
          {attendee.name}
        </Text>
        <View className="mt-0.5 flex-row items-center gap-0.5">
          <MaterialDesignIcons
            name="map-marker-outline"
            color={colors.secText}
            size={14}
          />
          <Text className="text-sm text-sec-text">{attendee.unit}</Text>
        </View>
      </View>

      <AttendeeStatusBadge status={attendee.status} />
    </View>
  );
}
