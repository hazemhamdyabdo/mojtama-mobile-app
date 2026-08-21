import AuthScreenLayout from "@/features/auth/components/AuthScreenLayout";
import LoginWithPhoneForm from "@/features/auth/components/LoginWithPhoneForm";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";

export default function LoginWithPhoneScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace({
      pathname: "/login",
      params: role ? { role } : undefined,
    } as Href);
  };

  return (
    <AuthScreenLayout onBack={handleBack}>
      <LoginWithPhoneForm />
    </AuthScreenLayout>
  );
}
