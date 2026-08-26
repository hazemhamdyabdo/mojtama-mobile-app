import "../../global.css";

import AppLoadingScreen from "@/components/AppLoadingScreen";
import { initializeI18n } from "@/localization/i18n";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

async function runStartupTasks() {
  await initializeI18n();
  // Auth token restore can be added here when session handling is implemented.
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.hideAsync();

      try {
        await runStartupTasks();
      } catch (error) {
        console.warn("Startup tasks failed", error);
      } finally {
        setIsReady(true);
      }
    }

    void prepare();
  }, []);

  if (!isReady) {
    return <AppLoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="create-announcement"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="create-news"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="create-poll"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="create-meeting"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="post/[id]"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="meeting/[id]"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="ai-chat"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="profile"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="notification-preferences"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="notifications"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="privacy"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="help"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-name"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-email-current"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-email-verify"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-email-new"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-phone-current"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-phone-verify"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="update-phone-new"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="payments"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="payment/[id]"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="payment/[id]/methods"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="visitors"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="create-visitor"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="visitor/[id]"
              options={{ headerShown: false, presentation: "card" }}
            />
            <Stack.Screen
              name="visitor/[id]/edit"
              options={{ headerShown: false, presentation: "card" }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
