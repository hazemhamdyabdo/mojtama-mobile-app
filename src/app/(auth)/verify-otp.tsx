import AuthScreenLayout from "@/features/auth/components/AuthScreenLayout";
import VerifyOtpForm from "@/features/auth/components/VerifyOtpForm";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect } from "react";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, role } = useLocalSearchParams<{ phone?: string; role?: string }>();

  useEffect(() => {
    if (!phone) {
      router.replace("/login-with-phone" as Href);
    }
  }, [phone, router]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/login-with-phone" as Href);
  };

  if (!phone) {
    return null;
  }

  return (
    <AuthScreenLayout onBack={handleBack}>
      <VerifyOtpForm phone={phone} authRole={role} />
    </AuthScreenLayout>
  );
}
