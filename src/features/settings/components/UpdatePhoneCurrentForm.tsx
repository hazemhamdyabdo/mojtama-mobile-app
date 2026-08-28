import { formatPhoneNumberE164 } from "@/features/auth/schemas/phoneLoginSchema";
import {
  DEFAULT_AUTH_COUNTRY,
  type AuthCountry,
} from "@/features/auth/constants/countries";
import SettingsPhoneInput from "@/features/settings/components/SettingsPhoneInput";
import SettingsPrimaryButton from "@/features/settings/components/SettingsPrimaryButton";
import SettingsUpdateIntro from "@/features/settings/components/SettingsUpdateIntro";
import {
  createUpdatePhoneSchema,
  type UpdatePhoneFormValues,
} from "@/features/settings/schemas/updatePhoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function UpdatePhoneCurrentForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] =
    useState<AuthCountry>(DEFAULT_AUTH_COUNTRY);

  const phoneSchema = useMemo(
    () => createUpdatePhoneSchema(selectedCountry.isoCode),
    [selectedCountry.isoCode],
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryIso: selectedCountry.isoCode,
      phone: "",
    },
  });

  const handleCountryChange = (country: AuthCountry) => {
    setSelectedCountry(country);
    setValue("countryIso", country.isoCode);
  };

  const onSubmit = (values: UpdatePhoneFormValues) => {
    const formattedPhone = formatPhoneNumberE164(
      selectedCountry.isoCode,
      values.phone,
    );

    router.push({
      pathname: "/update-phone-verify",
      params: { phone: formattedPhone },
    } as Href);
  };

  return (
    <View>
      <SettingsUpdateIntro
        title={t("settings.update.phone.title")}
        subtitle="Update Your Phone Number To Receive Important Alerts"
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <SettingsPhoneInput
            label="Enter Your Current Number"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountryChange}
            error={errors.phone?.message}
          />
        )}
      />

      <SettingsPrimaryButton
        label={t("common.next")}
        disabled={isSubmitting}
        onPress={() => void handleSubmit(onSubmit)()}
      />
    </View>
  );
}
