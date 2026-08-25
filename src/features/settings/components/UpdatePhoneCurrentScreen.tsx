import UpdatePhoneCurrentForm from "@/features/settings/components/UpdatePhoneCurrentForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdatePhoneCurrentScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Number">
      <UpdatePhoneCurrentForm />
    </SettingsUpdateScreenLayout>
  );
}
