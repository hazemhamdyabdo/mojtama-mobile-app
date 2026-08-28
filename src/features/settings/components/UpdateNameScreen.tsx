import UpdateNameForm from "@/features/settings/components/UpdateNameForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdateNameScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.name.screenTitle")}>
      <UpdateNameForm />
    </SettingsUpdateScreenLayout>
  );
}
