import { colors } from "@/theme/colors";
import {
  AUTH_COUNTRIES,
  type AuthCountry,
} from "@/features/auth/constants/countries";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";

export type CountryPickerBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type CountryPickerBottomSheetProps = {
  selectedCountry: AuthCountry;
  onSelectCountry: (country: AuthCountry) => void;
};

const CountryPickerBottomSheet = forwardRef<
  CountryPickerBottomSheetRef,
  CountryPickerBottomSheetProps
>(function CountryPickerBottomSheet(
  { selectedCountry, onSelectCountry },
  ref,
) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const snapPoints = useMemo(() => ["70%"], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setSearchQuery("");
      bottomSheetRef.current?.present();
    },
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return AUTH_COUNTRIES;
    }

    return AUTH_COUNTRIES.filter((country) => {
      const name = t(country.nameKey).toLowerCase();
      const callingCode = `+${country.callingCode}`;

      return name.includes(query) || callingCode.includes(query);
    });
  }, [searchQuery, t]);

  const renderBackdrop = useCallback(
    (props: ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSelectCountry = (country: AuthCountry) => {
    onSelectCountry(country);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.slate300, width: 48 }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <BottomSheetView className="flex-1 px-4 pb-6">
        <Text className="mb-4 text-center text-lg font-semibold text-heading">
          {t("auth.phoneLogin.countrySheetTitle")}
        </Text>

        <View className="mb-4 flex-row items-center rounded-xl border border-card-border bg-white px-3">
          <Text className="mr-2 text-sec-text">⌕</Text>
          <BottomSheetTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("auth.phoneLogin.searchPlaceholder")}
            placeholderTextColor={colors.secText}
            className="flex-1 py-3 text-base text-heading"
          />
        </View>

        <BottomSheetFlatList
          data={filteredCountries}
          keyExtractor={(item) => item.isoCode}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = item.isoCode === selectedCountry.isoCode;

            return (
              <Pressable
                onPress={() => handleSelectCountry(item)}
                className={`mb-2 flex-row items-center rounded-xl px-3 py-3 active:opacity-[0.92] ${
                  isSelected ? "bg-primary-100" : "bg-transparent"
                }`}
              >
                <CountryFlag
                  isoCode={item.isoCode.toLowerCase()}
                  size={24}
                  style={{ borderRadius: 12 }}
                />
                <Text className="ml-3 flex-1 text-base text-heading">
                  {t(item.nameKey)}
                </Text>
                <Text className="text-base text-sec-text">
                  +{item.callingCode}
                </Text>
              </Pressable>
            );
          }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CountryPickerBottomSheet;
