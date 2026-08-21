import AuthScreenLayout from "@/features/auth/components/AuthScreenLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace({
      pathname: "/language-choice",
      params: role ? { role } : undefined,
    });
  };

  return (
    <AuthScreenLayout onBack={handleBack}>
      <LoginForm />
    </AuthScreenLayout>
  );
}
