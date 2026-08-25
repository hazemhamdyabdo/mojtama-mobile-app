import type { ImageSourcePropType } from "react-native";

export type PaymentTab = "overview" | "history";

export type PaymentBillStatus = "pending" | "overdue" | "paid";

export type PaymentBillFilter = "all" | PaymentBillStatus;

export type PaymentSummary = {
  totalDue: string;
  totalPaid: string;
};

export type PaymentBill = {
  id: string;
  title: string;
  status: PaymentBillStatus;
  description: string;
  date: string;
  amount: string;
};

export type PaymentLineItem = {
  id: string;
  description: string;
  amount: string;
};

export type PaymentInvoiceInfo = {
  invoiceNumber: string;
  billedBy: string;
  issuedOn: string;
  paymentDue: string;
};

export type PaymentReceiptInfo = {
  refNumber: string;
  paymentMethod: string;
  paidOn: string;
};

export type PaymentCompanyInfo = {
  name: string;
  address: string;
  email: string;
  notes: string;
};

export type PaymentBillDetails = PaymentBill & {
  invoice: PaymentInvoiceInfo;
  lineItems: PaymentLineItem[];
  total: string;
  company: PaymentCompanyInfo;
  receipt?: PaymentReceiptInfo;
};

export type PaymentMethodType = "bank-transfer" | "digital-wallet";

export type PaymentBank = {
  id: string;
  name: string;
  nameAr: string;
  logo: ImageSourcePropType;
};

export type PaymentWallet = {
  id: string;
  name: string;
  nameAr: string;
  logo: ImageSourcePropType;
};
