import { colors } from "@/theme/colors";
import ManagerRequestDetailsScreen from "@/features/requests/components/manager/ManagerRequestDetailsScreen";
import ResidentRequestDetailsScreen from "@/features/requests/components/resident/ResidentRequestDetailsScreen";
import { useRequestsState } from "@/features/requests/hooks/useRequestsState";
import {
  deleteRequestFromState,
  updateRequestInState,
} from "@/features/requests/store/requestState";
import { useUserRole } from "@/features/service/hooks/useUserRole";
import { Redirect, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { ActivityIndicator } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function RequestDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role, isLoading } = useUserRole();
  const requests = useRequestsState();
  const requestId = Array.isArray(id) ? id[0] : id;
  const request = requestId
    ? requests.find((current) => current.id === requestId)
    : undefined;

  if (!request) {
    return <Redirect href="/requests" />;
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (role === "admin") {
    return (
      <ManagerRequestDetailsScreen
        request={request}
        onUpdate={updateRequestInState}
        onDelete={deleteRequestFromState}
      />
    );
  }

  return (
    <ResidentRequestDetailsScreen
      request={request}
      onDelete={deleteRequestFromState}
    />
  );
}
