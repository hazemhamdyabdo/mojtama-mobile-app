import PaymentDetailsActions from "@/features/payments/components/PaymentDetailsActions";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import PaymentDetailsCompanySection from "@/features/payments/components/PaymentDetailsCompanySection";
import PaymentDetailsHeader from "@/features/payments/components/PaymentDetailsHeader";
import PaymentDetailsInfoCard from "@/features/payments/components/PaymentDetailsInfoCard";
import PaymentDetailsInvoiceHeader from "@/features/payments/components/PaymentDetailsInvoiceHeader";
import PaymentDetailsLineItemsCard from "@/features/payments/components/PaymentDetailsLineItemsCard";
import PaymentDetailsTitleSection from "@/features/payments/components/PaymentDetailsTitleSection";
import PaymentDetailsTotalRow from "@/features/payments/components/PaymentDetailsTotalRow";
import type { PaymentBillDetails } from "@/features/payments/types";
import { useRouter, type Href } from "expo-router";
import { ScrollView, View } from "react-native";
type PaymentDetailsScreenProps = {
  bill: PaymentBillDetails;
};

export default function PaymentDetailsScreen({
  bill,
}: PaymentDetailsScreenProps) {
  const router = useRouter();

  const handlePayPress = () => {
    router.push(`/payment/${bill.id}/methods` as Href);
  };

  const handleDownloadPress = () => {
    console.log("download invoice:", bill.id);
  };

  const handleSharePress = () => {
    console.log("share invoice:", bill.id);
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <PaymentDetailsHeader />
        <PaymentDetailsTitleSection bill={bill} />
        <PaymentDetailsInvoiceHeader
          invoiceNumber={bill.invoice.invoiceNumber}
        />

        <PaymentDetailsInfoCard
          columns={[
            { label: "Billed by", value: bill.invoice.billedBy },
            { label: "Issued on", value: bill.invoice.issuedOn },
            { label: "Payment Due", value: bill.invoice.paymentDue },
          ]}
        />

        {bill.receipt ? (
          <PaymentDetailsInfoCard
            columns={[
              { label: "Ref number", value: bill.receipt.refNumber },
              { label: "Payment Method", value: bill.receipt.paymentMethod },
              { label: "Paid on", value: bill.receipt.paidOn },
            ]}
          />
        ) : null}

        <PaymentDetailsLineItemsCard lineItems={bill.lineItems} />
        <PaymentDetailsTotalRow total={bill.total} />
        <PaymentDetailsCompanySection company={bill.company} />
      </ScrollView>

      <View className="border-t border-card-border px-4 py-4">
        <PaymentDetailsActions
          status={bill.status}
          onPayPress={handlePayPress}
          onDownloadPress={handleDownloadPress}
          onSharePress={handleSharePress}
        />
      </View>
    </ScreenSafeAreaView>
  );
}
