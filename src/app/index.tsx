import AppLoadingScreen from "@/components/AppLoadingScreen";
import { hasValidMockSession } from "@/features/auth/storage/mockSession";
import { consumePendingHref } from "@/localization/i18n";
import { Redirect, type Href } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [target, setTarget] = useState<Href | null>(null);

  useEffect(() => {
    async function resolveInitialRoute() {
      const pendingHref = await consumePendingHref();

      if (pendingHref) {
        setTarget(pendingHref as Href);
        return;
      }

      const hasSession = await hasValidMockSession();
      setTarget(hasSession ? "/(tabs)" : "/(auth)/onboarding");
    }

    void resolveInitialRoute();
  }, []);

  if (!target) {
    return <AppLoadingScreen />;
  }

  return <Redirect href={target} />;
}
