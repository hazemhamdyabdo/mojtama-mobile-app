import UpdateEmailVerifyForm from "@/features/settings/components/UpdateEmailVerifyForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdateEmailVerifyScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Email">
      <UpdateEmailVerifyForm />
    </SettingsUpdateScreenLayout>
  );
}
