import {
  PAYMENT_BILLS,
  PAYMENT_DETAILS,
  PAYMENT_HISTORY,
  PAYMENT_SUMMARY,
} from "@/features/payments/constants/dummy";
import type {
  PaymentBill,
  PaymentBillDetails,
  PaymentSummary,
} from "@/features/payments/types";

type PaymentState = {
  summary: PaymentSummary;
  bills: PaymentBill[];
  history: PaymentBill[];
  details: Record<string, PaymentBillDetails>;
};

let paymentState: PaymentState = {
  summary: { ...PAYMENT_SUMMARY },
  bills: [...PAYMENT_BILLS],
  history: [...PAYMENT_HISTORY],
  details: { ...PAYMENT_DETAILS },
};

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getPaymentState(): PaymentState {
  return paymentState;
}

export function getPaymentBillFromState(
  billId: string,
): PaymentBillDetails | undefined {
  return paymentState.details[billId];
}

export function getAllBillsFromState(): PaymentBill[] {
  return [...paymentState.bills, ...paymentState.history];
}

function parseAmount(amount: string): number {
  const normalized = amount.replace(/[^\d.]/g, "");
  return Number.parseFloat(normalized) || 0;
}

function formatAmount(value: number): string {
  return `${value.toFixed(2)} SAR`;
}

export function markBillPaidInState(
  billId: string,
  paymentMethod: string,
): PaymentBillDetails | undefined {
  const details = paymentState.details[billId];
  if (!details || details.status === "paid") {
    return details;
  }

  const paidOn = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updatedDetails: PaymentBillDetails = {
    ...details,
    status: "paid",
    receipt: {
      refNumber: `0000${Date.now().toString().slice(-8)}`,
      paymentMethod,
      paidOn,
    },
  };

  paymentState = {
    ...paymentState,
    details: {
      ...paymentState.details,
      [billId]: updatedDetails,
    },
    bills: paymentState.bills.map((bill) =>
      bill.id === billId ? { ...bill, status: "paid" as const } : bill,
    ),
    history:
      paymentState.bills.some((bill) => bill.id === billId) &&
      !paymentState.history.some((bill) => bill.id === billId)
        ? [
            { ...updatedDetails },
            ...paymentState.history.filter((bill) => bill.id !== billId),
          ]
        : paymentState.history.map((bill) =>
            bill.id === billId ? { ...bill, status: "paid" as const } : bill,
          ),
    summary: {
      totalDue: formatAmount(
        Math.max(
          0,
          parseAmount(paymentState.summary.totalDue) -
            parseAmount(details.amount),
        ),
      ),
      totalPaid: formatAmount(
        parseAmount(paymentState.summary.totalPaid) +
          parseAmount(details.amount),
      ),
    },
  };

  notifyListeners();
  return updatedDetails;
}

export function subscribeToPayments(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function resetPaymentState(): void {
  paymentState = {
    summary: { ...PAYMENT_SUMMARY },
    bills: [...PAYMENT_BILLS],
    history: [...PAYMENT_HISTORY],
    details: { ...PAYMENT_DETAILS },
  };
  notifyListeners();
}
