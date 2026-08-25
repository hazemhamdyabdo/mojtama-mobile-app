import type { EmergencyContact } from "@/features/help/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Pressable, Text, View } from "react-native";

type EmergencyContactCardProps = {
  contact: EmergencyContact;
  onCall: (phoneNumber: string) => void;
};

export default function EmergencyContactCard({
  contact,
  onCall,
}: EmergencyContactCardProps) {
  return (
    <View className="mb-4 rounded-2xl border border-[#E4E4E7] bg-white p-4">
      <View className="flex-row items-center">
        <MaterialDesignIcons name={contact.icon} color="#7B61FF" size={28} />
        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-[#1F1F1F]">
            {contact.title}
          </Text>
          <Text className="mt-0.5 text-sm text-[#90A1B9]">
            {contact.subtitle}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => onCall(contact.phoneNumber)}
        accessibilityRole="button"
        accessibilityLabel={`Call ${contact.title} at ${contact.phoneNumber}`}
        className="mt-4 items-center rounded-2xl bg-[#7B61FF] py-3.5 active:opacity-[0.92]"
      >
        <Text className="text-base font-semibold text-white">
          {contact.phoneNumber} - Quick Call
        </Text>
      </Pressable>
    </View>
  );
}
