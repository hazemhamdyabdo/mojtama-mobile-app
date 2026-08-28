import UpdatePhoneNewForm from "@/features/settings/components/UpdatePhoneNewForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdatePhoneNewScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.phone.screenTitle")}>
      <UpdatePhoneNewForm />
    </SettingsUpdateScreenLayout>
  );
}
