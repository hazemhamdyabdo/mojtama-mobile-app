import CommunityOverviewSection from "@/features/service/components/CommunityOverviewSection";
import ManageServicesSection from "@/features/service/components/ManageServicesSection";
import ServiceHeader from "@/features/service/components/ServiceHeader";
import {
  ADMIN_SERVICE_ITEMS,
  SERVICE_USER,
} from "@/features/service/constants/dummy";
import { useRouter, type Href } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

export default function AdminServiceScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleServicePress = (itemId: string) => {
    if (itemId === "emergency") {
      router.push("/help" as Href);
      return;
    }

    if (itemId === "payments") {
      router.push("/payments" as Href);
      return;
    }

    if (itemId === "visitors") {
      router.push("/visitors" as Href);
      return;
    }

    if (itemId === "documents") {
      router.push("/documents" as Href);
      return;
    }

    if (itemId === "request") {
      router.push("/requests" as Href);
      return;
    }

    if (itemId === "residents") {
      router.push("/residents" as Href);
      return;
    }

    if (itemId === "meeting") {
      router.push("/meetings" as Href);
      return;
    }

    console.log("admin service pressed:", itemId);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-4 pb-28 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <ServiceHeader
        name={SERVICE_USER.name}
        role="admin"
        subtitle={t("service.admin.subtitle")}
        avatar={SERVICE_USER.avatar}
        notificationCount={SERVICE_USER.notificationCount}
        onNotificationsPress={() => router.push("/notifications" as Href)}
      />

      <CommunityOverviewSection />

      <ManageServicesSection
        items={ADMIN_SERVICE_ITEMS}
        variant="admin"
        onItemPress={handleServicePress}
      />
    </ScrollView>
  );
}
