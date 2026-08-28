import { colors } from "@/theme/colors";
import EditResidentRequestScreen from "@/features/requests/components/resident/EditResidentRequestScreen";
import { useRequestsState } from "@/features/requests/hooks/useRequestsState";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { Redirect, useLocalSearchParams, type Href } from "expo-router";
import { styled } from "nativewind";
import { ActivityIndicator } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function EditRequestRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role, isLoading } = useUserRole("resident");
  const requests = useRequestsState();
  const requestId = Array.isArray(id) ? id[0] : id;
  const request = requestId
    ? requests.find((current) => current.id === requestId)
    : undefined;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (role === "admin") {
    return <Redirect href={`/request/${requestId ?? ""}` as Href} />;
  }

  if (!request || request.status !== "pending") {
    return <Redirect href="/requests" />;
  }

  return <EditResidentRequestScreen request={request} />;
}
