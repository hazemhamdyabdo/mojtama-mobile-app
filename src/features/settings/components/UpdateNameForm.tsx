import { SETTINGS_PROFILE } from "@/features/settings/constants/dummy";
import SettingsLabeledInput from "@/features/settings/components/SettingsLabeledInput";
import SettingsPrimaryButton from "@/features/settings/components/SettingsPrimaryButton";
import SettingsUpdateIntro from "@/features/settings/components/SettingsUpdateIntro";
import {
  updateNameSchema,
  type UpdateNameFormValues,
} from "@/features/settings/schemas/updateNameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function UpdateNameForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateNameFormValues>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: SETTINGS_PROFILE.name,
    },
  });

  const onSubmit = (values: UpdateNameFormValues) => {
    // TODO: connect to settings API
    console.log("update name", values);
    router.back();
  };

  return (
    <View>
      <SettingsUpdateIntro
        title={t("settings.update.name.title")}
        subtitle="This Name Will Be Shown In Meetings, Payments, And Records."
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <SettingsLabeledInput
            label="Enter Your New Name"
            error={errors.name?.message}
            inputProps={{
              value,
              onChangeText: onChange,
              onBlur,
              placeholder: "Omar Essam",
              autoCapitalize: "words",
            }}
          />
        )}
      />

      <SettingsPrimaryButton
        label={t("common.save")}
        disabled={isSubmitting}
        onPress={() => void handleSubmit(onSubmit)()}
      />
    </View>
  );
}
