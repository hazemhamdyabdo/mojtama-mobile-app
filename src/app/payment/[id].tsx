import PaymentDetailsScreen from "@/features/payments/components/PaymentDetailsScreen";
import { getPaymentBillDetails } from "@/features/payments/constants/dummy";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function PaymentDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bill = id ? getPaymentBillDetails(id) : undefined;

  if (!bill) {
    return <Redirect href="/payments" />;
  }

  return <PaymentDetailsScreen bill={bill} />;
}
