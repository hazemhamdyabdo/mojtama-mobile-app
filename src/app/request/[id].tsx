import ManagerRequestDetailsScreen from "@/features/requests/components/manager/ManagerRequestDetailsScreen";
import {
  deleteRequestFromState,
  getRequestFromState,
  updateRequestInState,
} from "@/features/requests/store/requestState";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function RequestDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const request = id ? getRequestFromState(id) : undefined;

  if (!request) {
    return <Redirect href="/requests" />;
  }

  return (
    <ManagerRequestDetailsScreen
      request={request}
      onUpdate={updateRequestInState}
      onDelete={deleteRequestFromState}
    />
  );
}
