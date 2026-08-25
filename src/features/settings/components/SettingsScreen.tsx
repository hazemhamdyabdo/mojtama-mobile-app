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
import { Modal, ScrollView, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
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

        <SettingsSection title="Profile Settings">
          {PROFILE_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < PROFILE_SETTINGS_ITEMS.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title="App Settings">
          {APP_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < APP_SETTINGS_ITEMS.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title="About">
          {ABOUT_SETTINGS_ITEMS.map((item, index) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={() => handleSettingsPress(item.id)}
              showDivider={index < ABOUT_SETTINGS_ITEMS.length - 1}
            />
          ))}

          <SettingsToggleRow
            label="Dark Theme"
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
