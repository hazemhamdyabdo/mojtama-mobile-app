import type { PaymentBank, PaymentWallet } from "@/features/payments/types";

export const PAYMENT_BANKS: PaymentBank[] = [
  {
    id: "bsf",
    name: "Banque Saudi Fransi",
    nameAr: "البنك السعودي الفرنسي",
    logo: require("@/features/payments/constants/banque-saudi-fransi.png"),
  },
  {
    id: "saib",
    name: "The Saudi Investment Bank",
    nameAr: "البنك السعودي للاستثمار",
    logo: require("@/features/payments/constants/saudi-investment-bank.png"),
  },
  {
    id: "aljazira",
    name: "Bank Aljazira",
    nameAr: "بنك الجزيرة",
    logo: require("@/features/payments/constants/bank-aljazira.png"),
  },
  {
    id: "adcb",
    name: "ADCB",
    nameAr: "بنك أبوظبي التجاري",
    logo: require("@/features/payments/constants/adcb.png"),
  },
];

export const PAYMENT_WALLETS: PaymentWallet[] = [
  {
    id: "google-pay",
    name: "Google Pay",
    nameAr: "جوجل باي",
    logo: require("@/features/payments/constants/google-pay.png"),
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    nameAr: "ابل باي",
    logo: require("@/features/payments/constants/apple-pay.png"),
  },
  {
    id: "stc-pay",
    name: "Stc Pay",
    nameAr: "اس تي سي باي",
    logo: require("@/features/payments/constants/stc-pay.png"),
  },
  {
    id: "samsung-pay",
    name: "Samsung pay",
    nameAr: "سامسونج باي",
    logo: require("@/features/payments/constants/samsung-pay.png"),
  },
  {
    id: "paypal",
    name: "PayPal",
    nameAr: "باي بال",
    logo: require("@/features/payments/constants/paypal.png"),
  },
  {
    id: "stripe",
    name: "Stripe",
    nameAr: "سترايب",
    logo: require("@/features/payments/constants/stripe.png"),
  },
];
