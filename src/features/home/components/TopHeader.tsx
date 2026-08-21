import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type TopHeaderProps = {
  name?: string;
  unit?: string;
  notificationCount?: number;
  onNotificationsPress?: () => void;
};

export default function TopHeader({
  name = "Omar",
  unit = "Unit 32 T",
  notificationCount = 3,
  onNotificationsPress,
}: TopHeaderProps) {
  const showBadge = notificationCount > 0;

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <Image
          source={require("../constants/dummy-avatar.jpg")}
          contentFit="contain"
          style={{
            width: 48,
            height: 48,
            borderRadius: 100,
          }}
        />

        <View>
          <Text className="text-sm font-medium text-[#90A1B9]">
            Welcome {name} 👋
          </Text>
          <Text className="text-base font-semibold text-[#1E3A5F]">{unit}</Text>
        </View>
      </View>

      <Pressable
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        className="relative size-11 items-center justify-center rounded-full border border-[#E4E4E7] active:opacity-[0.92]"
      >
        <MaterialDesignIcons name="bell-outline" color="#7B61FF" size={22} />

        {showBadge ? (
          <View className="absolute -right-0.5 -top-0.5 min-w-4.5 items-center justify-center rounded-full bg-[#7B61FF] px-1 py-0.5">
            <Text className="text-[10px] font-bold leading-none text-white">
              {notificationCount > 99 ? "99+" : notificationCount}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}
