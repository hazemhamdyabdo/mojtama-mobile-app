import CreateManagerRequestScreen from "@/features/requests/components/manager/CreateManagerRequestScreen";
import CreateResidentRequestScreen from "@/features/requests/components/resident/CreateResidentRequestScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { styled } from "nativewind";
import { ActivityIndicator } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function CreateRequestRoute() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#7B61FF" />
      </SafeAreaView>
    );
  }

  if (role === "admin") {
    return <CreateManagerRequestScreen />;
  }

  return <CreateResidentRequestScreen />;
}
