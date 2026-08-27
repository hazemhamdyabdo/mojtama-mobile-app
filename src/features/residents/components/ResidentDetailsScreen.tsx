import ResidentDetailsHeader from "@/features/residents/components/ResidentDetailsHeader";
import ResidentPaymentHistoryItemRow from "@/features/residents/components/ResidentPaymentHistoryItemRow";
import ResidentProfileCard from "@/features/residents/components/ResidentProfileCard";
import type { Resident } from "@/features/residents/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type ResidentDetailsScreenProps = {
  resident: Resident;
};

export default function ResidentDetailsScreen({
  resident,
}: ResidentDetailsScreenProps) {
  const paymentHistory = resident.paymentHistory ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <ResidentDetailsHeader />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <ResidentProfileCard resident={resident} />

          {resident.totalOutstanding ? (
            <View className="mb-6">
              <Text className="mb-3 text-base font-bold text-[#1F1F1F]">
                Payments
              </Text>
              <View className="flex-row items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4">
                <View className="size-11 items-center justify-center rounded-xl bg-[#F0EDFF]">
                  <MaterialDesignIcons name="wallet-outline" color="#7B61FF" size={22} />
                </View>
                <View>
                  <Text className="text-sm text-[#64748B]">Total Outstanding</Text>
                  <Text className="mt-1 text-xl font-bold text-[#1F1F1F]">
                    {resident.totalOutstanding}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {paymentHistory.length > 0 ? (
            <View>
              <Text className="mb-3 text-base font-bold text-[#1F1F1F]">
                Payment History
              </Text>
              <View className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
                {paymentHistory.map((item, index) => (
                  <ResidentPaymentHistoryItemRow
                    key={item.id}
                    item={item}
                    isLast={index === paymentHistory.length - 1}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
