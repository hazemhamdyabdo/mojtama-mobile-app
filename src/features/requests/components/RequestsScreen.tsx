import ManagerRequestsScreen from "@/features/requests/components/manager/ManagerRequestsScreen";
import ResidentRequestsScreen from "@/features/requests/components/resident/ResidentRequestsScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestsScreen() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#7B61FF" />
      </SafeAreaView>
    );
  }

  if (role === "admin") {
    return <ManagerRequestsScreen />;
  }

  return <ResidentRequestsScreen />;
}
