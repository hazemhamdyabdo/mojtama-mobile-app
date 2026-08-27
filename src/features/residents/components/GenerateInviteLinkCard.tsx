import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type GenerateInviteLinkCardProps = {
  onGenerateLink: () => void;
};

export default function GenerateInviteLinkCard({
  onGenerateLink,
}: GenerateInviteLinkCardProps) {
  return (
    <View className="mb-5 flex-row items-center gap-3 rounded-2xl bg-[#F0EDFF] p-4">
      <View className="size-11 items-center justify-center rounded-full bg-[#7B61FF]">
        <MaterialDesignIcons name="link-variant" color="#FFFFFF" size={22} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-[#5B4ACF]">
          Generate Invite Link
        </Text>
        <Text className="mt-1 text-sm leading-5 text-[#7B61FF]">
          Share this link with resident to allow them to register in the
          community
        </Text>
      </View>

      <Pressable
        onPress={onGenerateLink}
        accessibilityRole="button"
        className="rounded-xl bg-[#7B61FF] px-3 py-2.5 active:opacity-[0.92]"
      >
        <Text className="text-xs font-bold text-white">Generate Link</Text>
      </Pressable>
    </View>
  );
}
