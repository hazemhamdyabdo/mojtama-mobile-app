import LanguageSettingsView from "@/features/settings/components/LanguageSettingsView";
import SettingsFooter from "@/features/settings/components/SettingsFooter";
import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsLogoutRow from "@/features/settings/components/SettingsLogoutRow";
import SettingsProfileCard from "@/features/settings/components/SettingsProfileCard";
import SettingsRow from "@/features/settings/components/SettingsRow";
import SettingsSection from "@/features/settings/components/SettingsSection";
import SettingsToggleRow from "@/features/settings/components/SettingsToggleRow";
import {
  ABOUT_SETTINGS_ITEMS,
  APP_SETTINGS_ITEMS,
  PROFILE_SETTINGS_ITEMS,
  SETTINGS_PROFILE,
} from "@/features/settings/constants/dummy";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ScrollView, View } from "react-native";

const SETTINGS_ITEM_I18N_KEYS: Record<string, string> = {
  profile: "profile",
  "update-name": "updateName",
  "update-email": "updateEmail",
  "update-phone": "updatePhone",
  notifications: "notifications",
  language: "language",
  privacy: "privacy",
  help: "help",
};

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);

  const handleSettingsPress = (itemId: string) => {
    switch (itemId) {
      case "profile":
        router.push("/profile" as Href);
        break;
      case "language":
        setIsLanguageSettingsOpen(true);
        break;
      case "notifications":
        router.push("/notification-preferences" as Href);
        break;
      case "privacy":
        router.push("/privacy" as Href);
        break;
      case "help":
        router.push("/help" as Href);
        break;
      case "update-name":
        router.push("/update-name" as Href);
        break;
      case "update-email":
        router.push("/update-email-current" as Href);
        break;
      case "update-phone":
        router.push("/update-phone-current" as Href);
        break;
      default:
        console.log("settings item pressed:", itemId);
    }
  };

  const handleLogout = () => {
    console.log("log out");
  };

  return (
    <View className="flex-1 bg-white">
      <Modal
        visible={isLanguageSettingsOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setIsLanguageSettingsOpen(false)}
      >
        <LanguageSettingsView
          onBack={() => setIsLanguageSettingsOpen(false)}
        />
      </Modal>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader />

        <SettingsProfileCard
          profile={SETTINGS_PROFILE}
          onPress={() => handleSettingsPress("profile")}
        />

        <SettingsSection title={t("settings.sections.profile")}>
          {PROFILE_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={t(`settings.items.${SETTINGS_ITEM_I18N_KEYS[item.id]}`)}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < PROFILE_SETTINGS_ITEMS.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title={t("settings.sections.app")}>
          {APP_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={t(`settings.items.${SETTINGS_ITEM_I18N_KEYS[item.id]}`)}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < APP_SETTINGS_ITEMS.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title={t("settings.sections.about")}>
          {ABOUT_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={t(`settings.items.${SETTINGS_ITEM_I18N_KEYS[item.id]}`)}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < ABOUT_SETTINGS_ITEMS.length - 1}
            />
          ))}

          <SettingsToggleRow
            label={t("settings.darkTheme")}
            value={isDarkTheme}
            onValueChange={setIsDarkTheme}
          />

          <SettingsLogoutRow onPress={handleLogout} />
        </SettingsSection>

        <SettingsFooter />
      </ScrollView>
    </View>
  );
}
