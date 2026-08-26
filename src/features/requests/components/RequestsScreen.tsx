import ManagerRequestsScreen from "@/features/requests/components/manager/ManagerRequestsScreen";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { styled } from "nativewind";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

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

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-center text-base font-semibold text-[#1F1F1F]">
        Resident Requests
      </Text>
      <Text className="mt-2 text-center text-sm text-[#90A1B9]">
        The resident requests flow will be implemented next.
      </Text>
    </SafeAreaView>
  );
}
