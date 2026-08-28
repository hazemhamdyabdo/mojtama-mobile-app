import { colors } from "@/theme/colors";
import type { EmergencyContact } from "@/features/help/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type EmergencyContactCardProps = {
  contact: EmergencyContact;
  onCall: (phoneNumber: string) => void;
};

export default function EmergencyContactCard({
  contact,
  onCall,
}: EmergencyContactCardProps) {
  const { t } = useTranslation();
  const title = t(`help.emergencyContacts.${contact.id}`);
  const subtitle = t(`help.emergencyContacts.${contact.id}Subtitle`);

  return (
    <View className="mb-4 rounded-2xl border border-card-border bg-white p-4">
      <View className="flex-row items-center">
        <MaterialDesignIcons name={contact.icon} color={colors.primary} size={28} />
        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-heading">{title}</Text>
          <Text className="mt-0.5 text-sm text-sec-text">{subtitle}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => onCall(contact.phoneNumber)}
        accessibilityRole="button"
        accessibilityLabel={`${title} ${contact.phoneNumber}`}
        className="mt-4 items-center rounded-2xl bg-primary py-3.5 active:opacity-[0.92]"
      >
        <Text className="text-base font-semibold text-white">
          {contact.phoneNumber}
        </Text>
      </Pressable>
    </View>
  );
}
