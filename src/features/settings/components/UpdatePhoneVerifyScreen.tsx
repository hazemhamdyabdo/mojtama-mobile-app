import UpdatePhoneVerifyForm from "@/features/settings/components/UpdatePhoneVerifyForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdatePhoneVerifyScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Number">
      <UpdatePhoneVerifyForm />
    </SettingsUpdateScreenLayout>
  );
}
