import { useEffect, useState } from "react";
import {
  getPaymentState,
  subscribeToPayments,
} from "@/features/payments/store/paymentState";

export function usePaymentsState() {
  const [state, setState] = useState(getPaymentState());

  useEffect(() => {
    return subscribeToPayments(() => {
      setState(getPaymentState());
    });
  }, []);

  return state;
}
