import { HELP_SUPPORT_CONTACTS } from "@/features/help/constants/dummy";
import type { HelpSupportContact } from "@/features/help/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import * as Linking from "expo-linking";
import { Pressable, Text, View } from "react-native";

type HelpStillNeedHelpCardProps = {
  onSupportPress?: () => void;
};

async function handleContactPress(contact: HelpSupportContact) {
  try {
    switch (contact.action) {
      case "phone":
        await Linking.openURL(`tel:${contact.value.replace(/\s/g, "")}`);
        break;
      case "email":
        await Linking.openURL(
          `mailto:${contact.value.toLowerCase().replace(/\s/g, "")}`,
        );
        break;
      case "support":
        await Linking.openURL(
          `tel:${HELP_SUPPORT_CONTACTS[0]?.value.replace(/\s/g, "") ?? ""}`,
        );
        break;
      default: {
        const exhaustive: never = contact.action;
        return exhaustive;
      }
    }
  } catch (error) {
    console.warn("Failed to open contact link", error);
  }
}

export default function HelpStillNeedHelpCard({
  onSupportPress,
}: HelpStillNeedHelpCardProps) {
  const handlePress = (contact: HelpSupportContact) => {
    if (contact.action === "support") {
      onSupportPress?.();
    }
    void handleContactPress(contact);
  };

  return (
    <View className="mt-2 justify-start rounded-2xl bg-[#F8F6FF] p-5">
      <View className="mb-4 flex-row items-center gap-3">
        <View className="size-12 items-center justify-center rounded-full bg-[#F0EDFF]">
          <MaterialDesignIcons
            name="comment-question-outline"
            color="#7B61FF"
            size={26}
          />
        </View>
        <View className="flex-1">
          <Text className="mt-3 text-lg font-bold text-[#1F1F1F]">
            Still Need Help?
          </Text>
          <Text className="mt-1 text-start text-sm text-[#64748B]">
            Can't Find What You're Looking For? Contact Our Support Team:
          </Text>
        </View>
      </View>

      <View className="gap-3">
        {HELP_SUPPORT_CONTACTS.map((contact) => (
          <Pressable
            key={contact.id}
            onPress={() => handlePress(contact)}
            accessibilityRole="button"
            accessibilityLabel={`${contact.label}: ${contact.value}`}
            className="flex-row items-center rounded-2xl bg-[#EDE9FF] px-4 py-3.5 active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name={contact.icon}
              color="#7B61FF"
              size={20}
            />
            <View className="ml-3 flex-1">
              <Text className="text-xs font-medium text-[#7B61FF]">
                {contact.label}
              </Text>
              <Text className="text-sm font-semibold text-[#1F1F1F]">
                {contact.value}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
