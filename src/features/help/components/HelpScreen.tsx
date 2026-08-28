import EmergencyContactCard from "@/features/help/components/EmergencyContactCard";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import EmergencyTipsCard from "@/features/help/components/EmergencyTipsCard";
import HelpFaqsTabContent from "@/features/help/components/HelpFaqsTabContent";
import HelpHeader from "@/features/help/components/HelpHeader";
import HelpTabs from "@/features/help/components/HelpTabs";
import ReportEmergencyButton from "@/features/help/components/ReportEmergencyButton";
import {
  EMERGENCY_CONTACTS,
  HELP_FAQ_CATEGORIES,
} from "@/features/help/constants/dummy";
import type { HelpTab } from "@/features/help/types";
import * as Linking from "expo-linking";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

async function openPhoneDialer(phoneNumber: string) {
  try {
    await Linking.openURL(`tel:${phoneNumber}`);
  } catch (error) {
    console.warn("Failed to open phone dialer", error);
  }
}

function EmergencyTabContent({
  onCall,
}: {
  onCall: (phoneNumber: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Text className="text-base font-bold text-heading">
        {t("help.emergency.contactsTitle")}
      </Text>
      <Text className="mb-4 mt-1 text-sm text-sec-text">
        {t("help.emergency.contactsSubtitle")}
      </Text>

      {EMERGENCY_CONTACTS.map((contact) => (
        <EmergencyContactCard
          key={contact.id}
          contact={contact}
          onCall={onCall}
        />
      ))}

      <EmergencyTipsCard />
    </>
  );
}

export default function HelpScreen() {
  const [activeTab, setActiveTab] = useState<HelpTab>("emergency");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string>(
    HELP_FAQ_CATEGORIES[0]?.id ?? "",
  );

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategoryId((current) =>
      current === categoryId ? "" : categoryId,
    );
  };

  const handleReportEmergency = () => {
    console.log("report emergency");
  };

  const handleSupportPress = () => {
    setActiveTab("emergency");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "emergency":
        return (
          <EmergencyTabContent
            onCall={(phone) => void openPhoneDialer(phone)}
          />
        );
      case "faqs":
        return (
          <HelpFaqsTabContent
            expandedCategoryId={expandedCategoryId}
            onToggleCategory={handleToggleCategory}
            onSupportPress={handleSupportPress}
          />
        );
      default: {
        const exhaustive: never = activeTab;
        return exhaustive;
      }
    }
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <HelpHeader />
        <HelpTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-6"
          showsVerticalScrollIndicator={false}
        >
          {renderTabContent()}
        </ScrollView>

        {activeTab === "emergency" ? (
          <ReportEmergencyButton onPress={handleReportEmergency} />
        ) : null}
      </View>
    </ScreenSafeAreaView>
  );
}
