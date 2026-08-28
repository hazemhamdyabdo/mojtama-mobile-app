import { verifyEmailUpdateOtp } from "@/features/settings/api";
import SettingsOtpForm from "@/features/settings/components/SettingsOtpForm";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";

export default function UpdateEmailVerifyForm() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const resolvedEmail = email ?? "your email";

  const handleSubmit = async (otp: string) => {
    await verifyEmailUpdateOtp(otp);
    router.push({
      pathname: "/update-email-new",
      params: { email: resolvedEmail },
    } as Href);
  };

  return (
    <SettingsOtpForm
      title="Verify Your Email"
      subtitle={`Enter The OTP Code Sent ${resolvedEmail}`}
      changeLinkLabel="Change Email"
      onChangePress={() => router.replace("/update-email-current" as Href)}
      onSubmit={handleSubmit}
    />
  );
}
