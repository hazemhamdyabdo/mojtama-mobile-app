import { colors } from "@/theme/colors";
import CountryPickerBottomSheet, {
  type CountryPickerBottomSheetRef,
} from "@/features/auth/components/CountryPickerBottomSheet";
import {
  DEFAULT_AUTH_COUNTRY,
  type AuthCountry,
} from "@/features/auth/constants/countries";
import {
  createPhoneLoginSchema,
  formatPhoneNumberE164,
  type PhoneLoginFormValues,
} from "@/features/auth/schemas/phoneLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { AsYouType } from "libphonenumber-js";
import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";

type PhoneLoginFormFieldsProps = {
  selectedCountry: AuthCountry;
  onOpenCountryPicker: () => void;
  authRole?: string;
};

function PhoneLoginFormFields({
  selectedCountry,
  onOpenCountryPicker,
  authRole,
}: PhoneLoginFormFieldsProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const phoneSchema = useMemo(
    () => createPhoneLoginSchema(t, selectedCountry.isoCode),
    [t, i18n.language, selectedCountry.isoCode],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryIso: selectedCountry.isoCode,
      phone: "",
    },
  });

  const onSubmit = (values: PhoneLoginFormValues) => {
    const formattedPhone = formatPhoneNumberE164(
      selectedCountry.isoCode,
      values.phone,
    );

    router.push({
      pathname: "/verify-otp",
      params: {
        phone: formattedPhone,
        ...(authRole ? { role: authRole } : {}),
      },
    });
  };

  const textAlign = I18nManager.isRTL ? "right" : "left";

  return (
    <View className="w-full">
      <View className="mb-14 w-full">
        <Text className="text-2xl font-semibold text-heading">
          {t("auth.phoneLogin.welcomeBack")}
        </Text>
        <Text className="mt-1 text-sm text-sec-text">
          {t("auth.phoneLogin.subtitle")}
        </Text>
      </View>

      <View className="mb-6 w-full">
        <Text className="mb-2 text-sm font-medium text-label">
          {t("auth.phoneLogin.phoneLabel")}
        </Text>

        <View
          className={`flex-row items-center overflow-hidden rounded-xl border bg-white ${
            errors.phone ? "border-rejected-200" : "border-card-border"
          }`}
        >
          <Pressable
            onPress={onOpenCountryPicker}
            className="flex-row items-center gap-2 border-r border-card-border px-3 py-3.5 active:opacity-[0.92]"
          >
            <CountryFlag
              isoCode={selectedCountry.isoCode.toLowerCase()}
              size={20}
              style={{ borderRadius: 10 }}
            />
            <Text className="text-sm font-medium text-heading">
              (+{selectedCountry.callingCode})
            </Text>
            <Text className="text-xs text-sec-text">▾</Text>
          </Pressable>

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  const formatter = new AsYouType(selectedCountry.isoCode);
                  onChange(formatter.input(text));
                }}
                onBlur={onBlur}
                placeholder={t("auth.phoneLogin.phonePlaceholder")}
                placeholderTextColor={colors.secText}
                keyboardType="phone-pad"
                className="flex-1 px-3 text-base text-heading"
                style={{
                  textAlign,
                  minHeight: 52,
                  paddingVertical: 14,
                }}
              />
            )}
          />
        </View>

        {errors.phone ? (
          <Text className="mt-2 text-sm text-rejected" style={{ textAlign }}>
            {errors.phone.message}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={() => void handleSubmit(onSubmit)()}
        disabled={isSubmitting}
        className="mb-6 w-full items-center justify-center rounded-2xl bg-primary py-4 active:opacity-[0.92] disabled:opacity-70"
      >
        <Text className="text-base font-bold text-white">
          {t("auth.phoneLogin.nextButton")}
        </Text>
      </Pressable>

      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-slate-200" />
        <Text className="mx-3 text-sm text-sec-text">
          {t("auth.phoneLogin.or")}
        </Text>
        <View className="h-px flex-1 bg-slate-200" />
      </View>

      <Pressable
        onPress={() => router.replace("/login" as Href)}
        className="w-full items-center justify-center rounded-2xl border border-primary py-4 active:opacity-[0.92]"
      >
        <Text className="text-base font-bold text-primary">
          {t("auth.phoneLogin.loginWithEmail")}
        </Text>
      </Pressable>
    </View>
  );
}

type LoginWithPhoneFormProps = {
  authRole?: string;
};

export default function LoginWithPhoneForm({ authRole }: LoginWithPhoneFormProps) {
  const { i18n } = useTranslation();
  const countryPickerRef = useRef<CountryPickerBottomSheetRef>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<AuthCountry>(DEFAULT_AUTH_COUNTRY);

  return (
    <>
      <CountryPickerBottomSheet
        ref={countryPickerRef}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />

      <PhoneLoginFormFields
        key={`${i18n.language}-${selectedCountry.isoCode}-${authRole ?? "default"}`}
        selectedCountry={selectedCountry}
        onOpenCountryPicker={() => countryPickerRef.current?.open()}
        authRole={authRole}
      />
    </>
  );
}
