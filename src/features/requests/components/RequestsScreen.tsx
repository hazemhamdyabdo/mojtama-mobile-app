import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import ManagerRequestsScreen from "@/features/requests/components/manager/ManagerRequestsScreen";
import ResidentRequestsScreen from "@/features/requests/components/resident/ResidentRequestsScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { ActivityIndicator, View } from "react-native";

export default function RequestsScreen() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <ScreenSafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={colors.primary} />
      </ScreenSafeAreaView>
    );
  }

  if (role === "admin") {
    return <ManagerRequestsScreen />;
  }

  return <ResidentRequestsScreen />;
}
