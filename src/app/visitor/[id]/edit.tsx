import EditVisitorScreen from "@/features/visitors/components/EditVisitorScreen";
import { useVisitorsState } from "@/features/visitors/hooks/useVisitorsState";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function EditVisitorRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visitors = useVisitorsState();
  const visitorId = Array.isArray(id) ? id[0] : id;
  const visitor = visitorId
    ? visitors.find((item) => item.id === visitorId)
    : undefined;

  if (!visitor) {
    return <Redirect href="/visitors" />;
  }

  return <EditVisitorScreen visitor={visitor} />;
}
