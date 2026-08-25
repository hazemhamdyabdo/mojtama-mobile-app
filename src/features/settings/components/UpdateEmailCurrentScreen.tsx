import UpdateEmailCurrentForm from "@/features/settings/components/UpdateEmailCurrentForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdateEmailCurrentScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Email">
      <UpdateEmailCurrentForm />
    </SettingsUpdateScreenLayout>
  );
}
