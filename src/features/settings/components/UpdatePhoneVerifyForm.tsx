import SettingsOtpForm from "@/features/settings/components/SettingsOtpForm";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";

export default function UpdatePhoneVerifyForm() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const resolvedPhone = phone ?? "your number";

  const handleSubmit = () => {
    router.push({
      pathname: "/update-phone-new",
      params: { phone: resolvedPhone },
    } as Href);
  };

  return (
    <SettingsOtpForm
      title="Verify Your Number"
      subtitle={`Enter The OTP Code Sent ${resolvedPhone}`}
      changeLinkLabel="Change Number"
      onChangePress={() => router.replace("/update-phone-current" as Href)}
      onSubmit={handleSubmit}
    />
  );
}
