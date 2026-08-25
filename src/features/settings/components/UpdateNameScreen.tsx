import UpdateNameForm from "@/features/settings/components/UpdateNameForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdateNameScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Name">
      <UpdateNameForm />
    </SettingsUpdateScreenLayout>
  );
}
