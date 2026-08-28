import PaymentFilterChips from "@/features/payments/components/PaymentFilterChips";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import PaymentSummarySection from "@/features/payments/components/PaymentSummarySection";
import PaymentsBillListSection from "@/features/payments/components/PaymentsBillListSection";
import PaymentsHeader from "@/features/payments/components/PaymentsHeader";
import PaymentsSearchBar from "@/features/payments/components/PaymentsSearchBar";
import PaymentsTabs from "@/features/payments/components/PaymentsTabs";
import { usePaymentsState } from "@/features/payments/hooks/usePaymentsState";
import type { PaymentBillFilter, PaymentTab } from "@/features/payments/types";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

function filterBills(
  bills: ReturnType<typeof usePaymentsState>["bills"],
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
  const { t } = useTranslation();
  const { bills, history } = usePaymentsState();
  const [activeTab, setActiveTab] = useState<PaymentTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentBillFilter>("all");

  const overviewBills = useMemo(
    () => filterBills(bills, searchQuery, statusFilter),
    [bills, searchQuery, statusFilter],
  );

  const historyBills = useMemo(
    () => filterBills(history, searchQuery, statusFilter),
    [history, searchQuery, statusFilter],
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
              <Text className="text-base font-medium text-heading">
                {t("payments.empty.historyTitle")}
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                {t("payments.empty.historyMessage")}
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
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
    </ScreenSafeAreaView>
  );
}
