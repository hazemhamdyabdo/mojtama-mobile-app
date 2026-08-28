import UpdatePhoneVerifyForm from "@/features/settings/components/UpdatePhoneVerifyForm";
import SettingsUpdateScreenLayout from "@/features/settings/components/SettingsUpdateScreenLayout";
import { useTranslation } from "react-i18next";

export default function UpdatePhoneVerifyScreen() {
  const { t } = useTranslation();

  return (
    <SettingsUpdateScreenLayout title={t("settings.update.phone.screenTitle")}>
      <UpdatePhoneVerifyForm />
    </SettingsUpdateScreenLayout>
  );
}
