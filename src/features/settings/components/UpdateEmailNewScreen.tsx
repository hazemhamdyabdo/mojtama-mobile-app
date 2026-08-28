import UpdateEmailNewForm from "@/features/settings/components/UpdateEmailNewForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdateEmailNewScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.email.screenTitle")}>
      <UpdateEmailNewForm />
    </SettingsUpdateScreenLayout>
  );
}
