import AuthScreenLayout from "@/features/auth/components/AuthScreenLayout";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { useRouter, type Href } from "expo-router";

export default function ResetPasswordScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/forget-password" as Href);
  };

  return (
    <AuthScreenLayout onBack={handleBack}>
      <ResetPasswordForm />
    </AuthScreenLayout>
  );
}
