import type {
  PaymentBill,
  PaymentBillDetails,
  PaymentBillFilter,
  PaymentSummary,
  PaymentTab,
} from "@/features/payments/types";

export const PAYMENT_TABS: { id: PaymentTab }[] = [
  { id: "overview" },
  { id: "history" },
];

export const PAYMENT_FILTERS: { id: PaymentBillFilter }[] = [
  { id: "all" },
  { id: "pending" },
  { id: "overdue" },
  { id: "paid" },
];

export const PAYMENT_SUMMARY: PaymentSummary = {
  totalDue: "512.50 SAR",
  totalPaid: "1420.50 SAR",
};

const BASE_INVOICE = {
  invoiceNumber: "200134",
  billedBy: "Jade Smith",
  issuedOn: "August 5, 2025",
  paymentDue: "August 12, 2025",
};

const BASE_LINE_ITEMS = [
  { id: "1", description: "Elevator Upgrade", amount: "4,000.00" },
  { id: "2", description: "Fees", amount: "200.00" },
];

const BASE_COMPANY = {
  name: "Company Name LLC",
  address: "Address / Contact Info",
  email: "email@company.com",
  notes: "Have a great day",
};

const BASE_DESCRIPTION =
  "Extra Fee For Elevator Upgrade, Not Included In Annul Fees. Approved By Community Vote.";

export const PAYMENT_BILLS: PaymentBill[] = [
  {
    id: "1",
    title: "Elevator Upgrade",
    status: "pending",
    description: BASE_DESCRIPTION,
    date: "30 December, 2024",
    amount: "12900 SAR",
  },
  {
    id: "2",
    title: "Elevator Upgrade",
    status: "overdue",
    description: BASE_DESCRIPTION,
    date: "30 December, 2024",
    amount: "12900 SAR",
  },
  {
    id: "3",
    title: "Elevator Upgrade",
    status: "paid",
    description: BASE_DESCRIPTION,
    date: "30 December, 2024",
    amount: "12900 SAR",
  },
];

export const PAYMENT_HISTORY: PaymentBill[] = [
  {
    id: "h1",
    title: "Monthly Maintenance",
    status: "paid",
    description: "Regular monthly community maintenance fee for December 2024.",
    date: "15 December, 2024",
    amount: "450.00 SAR",
  },
  {
    id: "h2",
    title: "Parking Fee",
    status: "paid",
    description: "Annual parking allocation fee for assigned spot B-12.",
    date: "01 November, 2024",
    amount: "970.50 SAR",
  },
];

export const PAYMENT_DETAILS: Record<string, PaymentBillDetails> = {
  "1": {
    ...PAYMENT_BILLS[0]!,
    invoice: BASE_INVOICE,
    lineItems: BASE_LINE_ITEMS,
    total: "4,200.00 SAR",
    company: BASE_COMPANY,
  },
  "2": {
    ...PAYMENT_BILLS[1]!,
    invoice: BASE_INVOICE,
    lineItems: BASE_LINE_ITEMS,
    total: "4,200.00 SAR",
    company: BASE_COMPANY,
  },
  "3": {
    ...PAYMENT_BILLS[2]!,
    invoice: BASE_INVOICE,
    lineItems: BASE_LINE_ITEMS,
    total: "4,200.00 SAR",
    company: BASE_COMPANY,
    receipt: {
      refNumber: "000045689245",
      paymentMethod: "Bank transfer",
      paidOn: "25-7-2025, 12:30",
    },
  },
  h1: {
    ...PAYMENT_HISTORY[0]!,
    invoice: {
      invoiceNumber: "200089",
      billedBy: "Jade Smith",
      issuedOn: "December 1, 2024",
      paymentDue: "December 15, 2024",
    },
    lineItems: [
      { id: "1", description: "Monthly Maintenance", amount: "400.00" },
      { id: "2", description: "Fees", amount: "50.00" },
    ],
    total: "450.00 SAR",
    company: BASE_COMPANY,
    receipt: {
      refNumber: "000045689100",
      paymentMethod: "Bank transfer",
      paidOn: "15-12-2024, 09:15",
    },
  },
  h2: {
    ...PAYMENT_HISTORY[1]!,
    invoice: {
      invoiceNumber: "200045",
      billedBy: "Jade Smith",
      issuedOn: "November 1, 2024",
      paymentDue: "November 15, 2024",
    },
    lineItems: [
      { id: "1", description: "Parking Fee", amount: "920.00" },
      { id: "2", description: "Fees", amount: "50.50" },
    ],
    total: "970.50 SAR",
    company: BASE_COMPANY,
    receipt: {
      refNumber: "000045688900",
      paymentMethod: "Credit card",
      paidOn: "01-11-2024, 14:20",
    },
  },
};

export function getPaymentBillDetails(
  billId: string,
): PaymentBillDetails | undefined {
  return PAYMENT_DETAILS[billId];
}

export function getAllPaymentBills(): PaymentBill[] {
  return [...PAYMENT_BILLS, ...PAYMENT_HISTORY];
}
