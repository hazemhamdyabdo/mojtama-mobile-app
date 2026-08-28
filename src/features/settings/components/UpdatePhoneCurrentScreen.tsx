import UpdatePhoneCurrentForm from "@/features/settings/components/UpdatePhoneCurrentForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdatePhoneCurrentScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.phone.screenTitle")}>
      <UpdatePhoneCurrentForm />
    </SettingsUpdateScreenLayout>
  );
}
