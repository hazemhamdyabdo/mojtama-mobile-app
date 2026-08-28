import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import VisitorCard from "@/features/visitors/components/VisitorCard";
import VisitorQrBottomSheet, {
  type VisitorQrBottomSheetRef,
} from "@/features/visitors/components/VisitorQrBottomSheet";
import VisitorsHeader from "@/features/visitors/components/VisitorsHeader";
import VisitorsTabs from "@/features/visitors/components/VisitorsTabs";
import {
  DUMMY_VISITORS,
  getVisitorById,
} from "@/features/visitors/constants/dummy";
import type { VisitorsTab } from "@/features/visitors/types";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter, type Href } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function VisitorsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const qrSheetRef = useRef<VisitorQrBottomSheetRef>(null);
  const [activeTab, setActiveTab] = useState<VisitorsTab>("upcoming");

  const visibleVisitors = useMemo(
    () =>
      DUMMY_VISITORS.filter((visitor) =>
        activeTab === "upcoming"
          ? visitor.status !== "complete"
          : visitor.status === "complete",
      ),
    [activeTab],
  );

  const handleQrPress = (visitorId: string) => {
    const visitor = getVisitorById(visitorId);

    if (visitor) {
      qrSheetRef.current?.open(visitor);
    }
  };

  return (
    <ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-4 pt-4">
        <VisitorsHeader />
        <VisitorsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-24"
          showsVerticalScrollIndicator={false}
        >
          {visibleVisitors.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-base font-medium text-heading">
                {t("visitors.empty.title")}
              </Text>
              <Text className="mt-1 text-center text-sm text-sec-text">
                {activeTab === "upcoming"
                  ? t("visitors.empty.upcoming")
                  : t("visitors.empty.previous")}
              </Text>
            </View>
          ) : (
            visibleVisitors.map((visitor) => (
              <VisitorCard
                key={visitor.id}
                visitor={visitor}
                onDetailsPress={(visitorId) =>
                  router.push(`/visitor/${visitorId}` as Href)
                }
                onQrPress={handleQrPress}
                onSharePress={(visitorId) =>
                  console.log("share visit:", visitorId)
                }
              />
            ))
          )}
        </ScrollView>

        <Pressable
          onPress={() => router.push("/create-visitor" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("visitors.a11y.addNewVisitor")}
          className="absolute bottom-6 right-4 size-14 items-center justify-center rounded-full bg-primary active:opacity-[0.92]"
        >
          <MaterialDesignIcons name="plus" color={colors.white} size={28} />
        </Pressable>
      </View>

      <VisitorQrBottomSheet
        ref={qrSheetRef}
        onDownload={(visitorId) => console.log("download qr:", visitorId)}
      />
    </ScreenSafeAreaView>
  );
}
