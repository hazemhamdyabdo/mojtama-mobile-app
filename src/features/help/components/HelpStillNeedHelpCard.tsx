import { colors } from "@/theme/colors";
import { HELP_SUPPORT_CONTACTS } from "@/features/help/constants/dummy";
import type { HelpSupportContact } from "@/features/help/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const handlePress = (contact: HelpSupportContact) => {
    if (contact.action === "support") {
      onSupportPress?.();
    }
    void handleContactPress(contact);
  };

  return (
    <View className="mt-2 justify-start rounded-2xl bg-primary-50 p-5">
      <View className="mb-4 flex-row items-center gap-3">
        <View className="size-12 items-center justify-center rounded-full bg-primary-50">
          <MaterialDesignIcons
            name="comment-question-outline"
            color={colors.primary}
            size={26}
          />
        </View>
        <View className="flex-1">
          <Text className="mt-3 text-lg font-bold text-heading">
            {t("help.support.title")}
          </Text>
        </View>
      </View>

      <View className="gap-3">
        {HELP_SUPPORT_CONTACTS.map((contact) => (
          <Pressable
            key={contact.id}
            onPress={() => handlePress(contact)}
            accessibilityRole="button"
            accessibilityLabel={`${t(`help.support.${contact.id}`)}: ${contact.value}`}
            className="flex-row items-center rounded-2xl bg-primary-100 px-4 py-3.5 active:opacity-[0.92]"
          >
            <MaterialDesignIcons
              name={contact.icon}
              color={colors.primary}
              size={20}
            />
            <View className="ml-3 flex-1">
              <Text className="text-xs font-medium text-primary">
                {t(`help.support.${contact.id}`)}
              </Text>
              <Text className="text-sm font-semibold text-heading">
                {contact.value}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
