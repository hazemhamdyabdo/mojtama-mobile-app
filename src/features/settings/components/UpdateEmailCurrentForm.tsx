import SettingsLabeledInput from "@/features/settings/components/SettingsLabeledInput";
import SettingsPrimaryButton from "@/features/settings/components/SettingsPrimaryButton";
import SettingsUpdateIntro from "@/features/settings/components/SettingsUpdateIntro";
import {
  updateEmailSchema,
  type UpdateEmailFormValues,
} from "@/features/settings/schemas/updateEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

export default function UpdateEmailCurrentForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: UpdateEmailFormValues) => {
    router.push({
      pathname: "/update-email-verify",
      params: { email: values.email },
    } as Href);
  };

  return (
    <View>
      <SettingsUpdateIntro
        title="Update Your Email"
        subtitle="Update Your Email To Continue Receiving Notifications."
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <SettingsLabeledInput
            label="Enter Your Current Email"
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
        label="Next"
        disabled={isSubmitting}
        onPress={() => void handleSubmit(onSubmit)()}
      />
    </View>
  );
}
