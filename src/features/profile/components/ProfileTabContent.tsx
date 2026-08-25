import { SUPPORT_REQUESTS } from "@/features/profile/constants/dummy";
import ProfileEmptyTabState from "@/features/profile/components/ProfileEmptyTabState";
import SupportRequestCard from "@/features/profile/components/SupportRequestCard";
import type { ProfileTab } from "@/features/profile/types";
import { View } from "react-native";

type ProfileTabContentProps = {
  activeTab: ProfileTab;
};

export default function ProfileTabContent({ activeTab }: ProfileTabContentProps) {
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
        <ProfileEmptyTabState message="No payments to show yet." />
      );
    case "visitations":
      return (
        <ProfileEmptyTabState message="No visitations to show yet." />
      );
    default: {
      const _exhaustive: never = activeTab;
      return _exhaustive;
    }
  }
}
