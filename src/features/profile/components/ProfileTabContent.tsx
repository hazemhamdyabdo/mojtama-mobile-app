import ProfileEmptyTabState from "@/features/profile/components/ProfileEmptyTabState";
import SupportRequestCard from "@/features/profile/components/SupportRequestCard";
import { SUPPORT_REQUESTS } from "@/features/profile/constants/dummy";
import type { ProfileTab } from "@/features/profile/types";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type ProfileTabContentProps = {
  activeTab: ProfileTab;
};

export default function ProfileTabContent({ activeTab }: ProfileTabContentProps) {
  const { t } = useTranslation();

  switch (activeTab) {
    case "support-requests":
      return (
        <View>
          {SUPPORT_REQUESTS.map((request) => (
            <SupportRequestCard key={request.id} request={request} />
          ))}
        </View>
      );
    case "payments":
      return (
        <ProfileEmptyTabState message={t("profile.empty.payments")} />
      );
    case "visitations":
      return (
        <ProfileEmptyTabState message={t("profile.empty.visitations")} />
      );
    default: {
      const exhaustive: never = activeTab;
      return exhaustive;
    }
  }
}
