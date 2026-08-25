import UpdateEmailNewForm from "@/features/settings/components/UpdateEmailNewForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdateEmailNewScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Email">
      <UpdateEmailNewForm />
    </SettingsUpdateScreenLayout>
  );
}
