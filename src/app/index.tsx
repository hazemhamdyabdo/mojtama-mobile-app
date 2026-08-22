import { consumePendingHref } from "@/localization/i18n";
import { Redirect, type Href } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [target, setTarget] = useState<Href | null>(null);

  useEffect(() => {
    async function resolveInitialRoute() {
      const pendingHref = await consumePendingHref();
      setTarget((pendingHref as Href | null) ?? "/(auth)/onboarding");
      // setTarget((pendingHref as Href | null) ?? "/(tabs)");
    }

    void resolveInitialRoute();
  }, []);

  if (!target) {
    return null;
  }

  return <Redirect href={target} />;
}
