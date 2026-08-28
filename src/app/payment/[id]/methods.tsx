import PaymentMethodsScreen from "@/features/payments/components/PaymentMethodsScreen";
import { usePaymentsState } from "@/features/payments/hooks/usePaymentsState";
import { Redirect, useLocalSearchParams, type Href } from "expo-router";

export default function PaymentMethodsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { details } = usePaymentsState();
  const billId = Array.isArray(id) ? id[0] : id;
  const bill = billId ? details[billId] : undefined;

  if (!bill) {
    return <Redirect href="/payments" />;
  }

  if (bill.status === "paid") {
    return <Redirect href={`/payment/${bill.id}` as Href} />;
  }

  return <PaymentMethodsScreen bill={bill} />;
}
