import UpdateEmailCurrentForm from "@/features/settings/components/UpdateEmailCurrentForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdateEmailCurrentScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.email.screenTitle")}>
      <UpdateEmailCurrentForm />
    </SettingsUpdateScreenLayout>
  );
}
