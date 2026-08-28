import { colors } from "@/theme/colors";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import CreateManagerRequestScreen from "@/features/requests/components/manager/CreateManagerRequestScreen";
import CreateResidentRequestScreen from "@/features/requests/components/resident/CreateResidentRequestScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { ActivityIndicator } from "react-native";
export default function CreateRequestRoute() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <ScreenSafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={colors.primary} />
      </ScreenSafeAreaView>
    );
  }

  if (role === "admin") {
    return <CreateManagerRequestScreen />;
  }

  return <CreateResidentRequestScreen />;
}
