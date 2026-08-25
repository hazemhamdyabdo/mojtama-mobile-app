import CountryPickerBottomSheet, {
  type CountryPickerBottomSheetRef,
} from "@/features/auth/components/CountryPickerBottomSheet";
import {
  DEFAULT_AUTH_COUNTRY,
  type AuthCountry,
} from "@/features/auth/constants/countries";
import { AsYouType } from "libphonenumber-js";
import { useRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import CountryFlag from "react-native-country-flag";

type SettingsPhoneInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  selectedCountry: AuthCountry;
  onSelectCountry: (country: AuthCountry) => void;
  error?: string;
  placeholder?: string;
};

export default function SettingsPhoneInput({
  label,
  value,
  onChange,
  onBlur,
  selectedCountry,
  onSelectCountry,
  error,
  placeholder = "100 123 7891",
}: SettingsPhoneInputProps) {
  const countryPickerRef = useRef<CountryPickerBottomSheetRef>(null);

  return (
    <>
      <CountryPickerBottomSheet
        ref={countryPickerRef}
        selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry}
      />

      <View className="mb-6">
        <Text className="mb-2 text-sm font-semibold text-[#1F1F1F]">
          {label}
        </Text>

        <View
          className={`flex-row items-center overflow-hidden rounded-xl border bg-white ${
            error ? "border-[#FCA5A5]" : "border-[#7B61FF]"
          }`}
        >
          <Pressable
            onPress={() => countryPickerRef.current?.open()}
            accessibilityRole="button"
            className="flex-row items-center gap-2 border-r border-[#E4E4E7] px-3 py-3.5 active:opacity-[0.92]"
          >
            <CountryFlag
              isoCode={selectedCountry.isoCode.toLowerCase()}
              size={20}
              style={{ borderRadius: 10 }}
            />
            <Text className="text-sm font-medium text-[#1F1F1F]">
              (+{selectedCountry.callingCode})
            </Text>
            <Text className="text-xs text-[#90A1B9]">▾</Text>
          </Pressable>

          <TextInput
            value={value}
            onChangeText={(text) => {
              const formatter = new AsYouType(selectedCountry.isoCode);
              onChange(formatter.input(text));
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#90A1B9"
            keyboardType="phone-pad"
            className="flex-1 px-3 text-base text-[#1F1F1F]"
            style={{ minHeight: 52, paddingVertical: 14 }}
          />
        </View>

        {error ? (
          <Text className="mt-2 text-sm text-[#EF4444]">{error}</Text>
        ) : null}
      </View>
    </>
  );
}

export { DEFAULT_AUTH_COUNTRY };
