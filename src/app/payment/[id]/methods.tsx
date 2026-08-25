import PaymentMethodsScreen from "@/features/payments/components/PaymentMethodsScreen";
import { getPaymentBillDetails } from "@/features/payments/constants/dummy";
import { Redirect, useLocalSearchParams, type Href } from "expo-router";

export default function PaymentMethodsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bill = id ? getPaymentBillDetails(id) : undefined;

  if (!bill) {
    return <Redirect href="/payments" />;
  }

  if (bill.status === "paid") {
    return <Redirect href={`/payment/${bill.id}` as Href} />;
  }

  return <PaymentMethodsScreen bill={bill} />;
}
