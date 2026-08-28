import PaymentDetailsScreen from "@/features/payments/components/PaymentDetailsScreen";
import { usePaymentsState } from "@/features/payments/hooks/usePaymentsState";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function PaymentDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { details } = usePaymentsState();
  const billId = Array.isArray(id) ? id[0] : id;
  const bill = billId ? details[billId] : undefined;

  if (!bill) {
    return <Redirect href="/payments" />;
  }

  return <PaymentDetailsScreen bill={bill} />;
}
