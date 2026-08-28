import SettingsLabeledInput from "@/features/settings/components/SettingsLabeledInput";
import SettingsPendingVerificationCard from "@/features/settings/components/SettingsPendingVerificationCard";
import SettingsPrimaryButton from "@/features/settings/components/SettingsPrimaryButton";
import SettingsUpdateIntro from "@/features/settings/components/SettingsUpdateIntro";
import {
  updateEmailSchema,
  type UpdateEmailFormValues,
} from "@/features/settings/schemas/updateEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function UpdateEmailNewForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: UpdateEmailFormValues) => {
    // TODO: connect to settings API
    console.log("update email", values);
    router.back();
  };

  return (
    <View>
      <SettingsUpdateIntro
        title={t("settings.update.email.title")}
        subtitle="Enter Your New Email To Stay Connected"
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <SettingsLabeledInput
            label="Enter Your New Email"
            error={errors.email?.message}
            inputProps={{
              value,
              onChangeText: onChange,
              onBlur,
              placeholder: "Email Address",
              keyboardType: "email-address",
              autoCapitalize: "none",
              autoCorrect: false,
            }}
          />
        )}
      />

      <SettingsPrimaryButton
        label="Update"
        disabled={isSubmitting}
        onPress={() => void handleSubmit(onSubmit)()}
      />

      <SettingsPendingVerificationCard />
    </View>
  );
}
