import PaymentFilterChips from "@/features/payments/components/PaymentFilterChips";
import PaymentSummarySection from "@/features/payments/components/PaymentSummarySection";
import PaymentsBillListSection from "@/features/payments/components/PaymentsBillListSection";
import PaymentsHeader from "@/features/payments/components/PaymentsHeader";
import PaymentsSearchBar from "@/features/payments/components/PaymentsSearchBar";
import PaymentsTabs from "@/features/payments/components/PaymentsTabs";
import { PAYMENT_BILLS, PAYMENT_HISTORY } from "@/features/payments/constants/dummy";
import type { PaymentBillFilter, PaymentTab } from "@/features/payments/types";
import { useRouter, type Href } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function filterBills(
  bills: typeof PAYMENT_BILLS,
  searchQuery: string,
  statusFilter: PaymentBillFilter,
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return bills.filter((bill) => {
    const matchesStatus =
      statusFilter === "all" || bill.status === statusFilter;

    const matchesSearch =
      normalizedQuery.length === 0 ||
      bill.title.toLowerCase().includes(normalizedQuery) ||
      bill.description.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });
}

export default function PaymentsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PaymentTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentBillFilter>("all");

  const overviewBills = useMemo(
    () => filterBills(PAYMENT_BILLS, searchQuery, statusFilter),
    [searchQuery, statusFilter],
  );

  const historyBills = useMemo(
    () => filterBills(PAYMENT_HISTORY, searchQuery, statusFilter),
    [searchQuery, statusFilter],
  );

  const openPaymentDetails = (billId: string) => {
    router.push(`/payment/${billId}` as Href);
  };

  const handlePayPress = (billId: string) => {
    openPaymentDetails(billId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <PaymentsBillListSection
            bills={overviewBills}
            onBillPress={openPaymentDetails}
            onPayPress={handlePayPress}
          />
        );
      case "history":
        if (historyBills.length === 0) {
          return (
            <View className="items-center py-12">
              <Text className="text-base font-medium text-[#1F1F1F]">
                No Payment History
              </Text>
              <Text className="mt-1 text-center text-sm text-[#90A1B9]">
                Completed payments will appear here.
              </Text>
            </View>
          );
        }

        return (
          <PaymentsBillListSection
            bills={historyBills}
            onBillPress={openPaymentDetails}
            onPayPress={handlePayPress}
          />
        );
      default: {
        const exhaustive: never = activeTab;
        return exhaustive;
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-8 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PaymentsHeader />
        <PaymentSummarySection />
        <PaymentsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <PaymentsSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <PaymentFilterChips
          selectedFilter={statusFilter}
          onSelectFilter={setStatusFilter}
        />
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
