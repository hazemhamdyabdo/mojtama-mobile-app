import {
  getAllBillsFromState,
  getPaymentBillFromState,
  markBillPaidInState,
} from "@/features/payments/store/paymentState";
import type {
  PaymentBill,
  PaymentBillDetails,
  PaymentSummary,
} from "@/features/payments/types";
import { getPaymentState } from "@/features/payments/store/paymentState";
import { MockApiError, mockDelay } from "@/utils/mockApi";

export async function getPayments(): Promise<{
  summary: PaymentSummary;
  bills: PaymentBill[];
  history: PaymentBill[];
}> {
  await mockDelay();
  const state = getPaymentState();
  return {
    summary: state.summary,
    bills: state.bills,
    history: state.history,
  };
}

export async function getPaymentById(
  billId: string,
): Promise<PaymentBillDetails> {
  await mockDelay();

  const bill = getPaymentBillFromState(billId);
  if (!bill) {
    throw new MockApiError("Payment not found", 404);
  }

  return bill;
}

export type PayBillRequest = {
  method: "bank-transfer" | "digital-wallet";
  paymentMethodLabel: string;
};

export async function payBill(
  billId: string,
  request: PayBillRequest,
): Promise<PaymentBillDetails> {
  await mockDelay(600);

  const bill = getPaymentBillFromState(billId);
  if (!bill) {
    throw new MockApiError("Payment not found", 404);
  }

  if (bill.status === "paid") {
    throw new MockApiError("Bill is already paid", 400);
  }

  const updated = markBillPaidInState(billId, request.paymentMethodLabel);
  if (!updated) {
    throw new MockApiError("Unable to process payment", 500);
  }

  return updated;
}

export async function getAllPaymentBills(): Promise<PaymentBill[]> {
  await mockDelay(200);
  return getAllBillsFromState();
}
