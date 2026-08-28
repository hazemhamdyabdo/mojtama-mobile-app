import { PAYMENT_TABS } from "@/features/payments/constants/dummy";
import type { PaymentTab } from "@/features/payments/types";
import { Pressable, Text, View } from "react-native";

type PaymentsTabsProps = {
  activeTab: PaymentTab;
  onTabChange: (tab: PaymentTab) => void;
};

export default function PaymentsTabs({
  activeTab,
  onTabChange,
}: PaymentsTabsProps) {
  return (
    <View className="mb-4 flex-row rounded-xl bg-slate-100 p-1">
      {PAYMENT_TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            className={`flex-1 items-center rounded-lg px-2 py-2.5 active:opacity-[0.92] ${
              isActive ? "bg-primary-50" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isActive ? "text-primary" : "text-slate-500"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
