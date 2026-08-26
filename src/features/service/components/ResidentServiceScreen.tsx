import ManageServicesSection from "@/features/service/components/ManageServicesSection";
import ServiceHeader from "@/features/service/components/ServiceHeader";
import {
  RESIDENT_SERVICE_ITEMS,
  SERVICE_USER,
} from "@/features/service/constants/dummy";
import { useRouter, type Href } from "expo-router";
import { ScrollView } from "react-native";

export default function ResidentServiceScreen() {
  const router = useRouter();

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

    console.log("resident service pressed:", itemId);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-4 pb-28 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <ServiceHeader
        name={SERVICE_USER.name}
        role="resident"
        subtitle={SERVICE_USER.unit}
        avatar={SERVICE_USER.avatar}
        notificationCount={SERVICE_USER.notificationCount}
        onNotificationsPress={() => router.push("/notifications" as Href)}
      />

      <ManageServicesSection
        title="Community Services"
        subtitle="Access community services and support"
        items={RESIDENT_SERVICE_ITEMS}
        onItemPress={handleServicePress}
      />
    </ScrollView>
  );
}
