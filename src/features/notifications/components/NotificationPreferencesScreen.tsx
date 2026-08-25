import NotificationPreferenceCard from "@/features/notifications/components/NotificationPreferenceCard";
import NotificationPreferencesHeader from "@/features/notifications/components/NotificationPreferencesHeader";
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  NOTIFICATION_PREFERENCES,
} from "@/features/notifications/constants/preferences";
import type {
  NotificationPreferenceKey,
  NotificationPreferencesState,
} from "@/features/notifications/types";
import { styled } from "nativewind";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function NotificationPreferencesScreen() {
  const [preferences, setPreferences] = useState<NotificationPreferencesState>(
    DEFAULT_NOTIFICATION_PREFERENCES,
  );

  const handleToggle = (key: NotificationPreferenceKey, value: boolean) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <NotificationPreferencesHeader />

        {NOTIFICATION_PREFERENCES.map((preference) => (
          <NotificationPreferenceCard
            key={preference.id}
            title={preference.title}
            description={preference.description}
            value={preferences[preference.id]}
            onValueChange={(value) => handleToggle(preference.id, value)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
