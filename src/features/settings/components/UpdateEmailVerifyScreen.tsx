import UpdateEmailVerifyForm from "@/features/settings/components/UpdateEmailVerifyForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdateEmailVerifyScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.email.screenTitle")}>
      <UpdateEmailVerifyForm />
    </SettingsUpdateScreenLayout>
  );
}
