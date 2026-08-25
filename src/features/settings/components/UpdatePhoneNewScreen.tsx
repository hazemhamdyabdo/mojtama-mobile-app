import UpdatePhoneNewForm from "@/features/settings/components/UpdatePhoneNewForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";

export default function UpdatePhoneNewScreen() {
  return (
    <SettingsUpdateScreenLayout title="Update Number">
      <UpdatePhoneNewForm />
    </SettingsUpdateScreenLayout>
  );
}
