import type { CountryCode } from "libphonenumber-js";

export type AuthCountry = {
  isoCode: CountryCode;
  nameKey: string;
  callingCode: string;
};

export const AUTH_COUNTRIES: AuthCountry[] = [
  { isoCode: "EG", nameKey: "auth.countries.egypt", callingCode: "20" },
  { isoCode: "SA", nameKey: "auth.countries.saudiArabia", callingCode: "966" },
  {
    isoCode: "AE",
    nameKey: "auth.countries.unitedArabEmirates",
    callingCode: "971",
  },
  { isoCode: "QA", nameKey: "auth.countries.qatar", callingCode: "974" },
  { isoCode: "LB", nameKey: "auth.countries.lebanon", callingCode: "961" },
  { isoCode: "OM", nameKey: "auth.countries.oman", callingCode: "968" },
  { isoCode: "JO", nameKey: "auth.countries.jordan", callingCode: "962" },
  { isoCode: "SY", nameKey: "auth.countries.syria", callingCode: "963" },
];

export const DEFAULT_AUTH_COUNTRY = AUTH_COUNTRIES[0];

export function findCountryByIso(isoCode: string): AuthCountry {
  return (
    AUTH_COUNTRIES.find((country) => country.isoCode === isoCode) ??
    DEFAULT_AUTH_COUNTRY
  );
}
